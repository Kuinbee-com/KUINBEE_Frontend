import * as Papa from 'papaparse';
import { generateDatasetUniqueId } from '@/shared/utils/uuidGenerator';
import { datasetSuperTypeOptions } from '../../types';

export interface CsvDatasetRow {
  title: string;
  primaryCategoryId: string;
  sourceId: string;
  datasetUniqueId?: string; // Optional since we'll generate if not provided
  price: number;
  isPaid: boolean;
  license: string;
  superTypes: string;
  overview: string;
  description: string;
  dataQuality: string;
  rows: number;
  cols: number;
  fileFormat: string;
  features: string; // Comma-separated features
  region: string;
  country: string;
  state: string;
  city: string;
  currentEncryptionSecret: string;
  masterSecret: string;
}

// Backend interface matching IDatasetBaseInput
export interface DatasetApiBody {
  title: string;
  primaryCategoryId: string;
  sourceId: string;
  datasetUniqueId: string;
  price: number;
  isPaid: boolean;
  license: string;
  superTypes: string;
  aboutDatasetInfo: {
    overview: string;
    description: string;
    dataQuality: string;
    dataFormatInfo: {
      rows: number;
      cols: number;
      fileFormat: string;
    };
    features: Array<{ content: string }>;
  };
  locationInfo: {
    region: string;
    country: string;
    state: string;
    city: string;
  };
  securityInfo: {
    currentEncryptionSecret: string;
    masterSecret: string;
  };
  categories: Array<{ id: string }>;
  warnings?: string[]; // Added to track validation warnings
}

/**
 * Creates a mapping of common variations to valid supertype options
 */
function createSuperTypeVariationMap(): Map<string, string> {
  const variationMap = new Map<string, string>();
  
  // Add direct mappings from our valid options (for case-insensitive matching)
  datasetSuperTypeOptions.forEach(validType => {
    variationMap.set(validType.toLowerCase(), validType);
  });
  
  // Add common variations and alternative spellings
  const variations: Record<string, string> = {
    // Cross-sectional variations
    'cross sectional': 'Cross-sectional',
    'cross-section': 'Cross-sectional',
    'cross section': 'Cross-sectional',
    'crosssectional': 'Cross-sectional',
    
    // Time-series variations
    'time series': 'Time-series',
    'timeseries': 'Time-series',
    'time-serie': 'Time-series',
    'time serie': 'Time-series',
    
    // Panel variations
    'panel data': 'Panel',
    'longitudinal': 'Panel',
    
    // Pooled cross-sectional variations
    'pooled cross sectional': 'Pooled cross-sectional',
    'pooled cross-section': 'Pooled cross-sectional',
    'pooled crosssectional': 'Pooled cross-sectional',
    
    // Repeated cross-sections variations
    'repeated cross sections': 'Repeated cross-sections',
    'repeated cross sectional': 'Repeated cross-sections',
    'repeated cross-section': 'Repeated cross-sections',
    
    // Spatial variations
    'geographic': 'Spatial',
    'geographical': 'Spatial',
    'geospatial': 'Spatial',
    'location': 'Spatial',
    
    // Spatio-temporal variations
    'spatio temporal': 'Spatio-temporal',
    'spatiotemporal': 'Spatio-temporal',
    'space-time': 'Spatio-temporal',
    'space time': 'Spatio-temporal',
    'geographic temporal': 'Spatio-temporal',
    
    // Experimental variations
    'experiment': 'Experimental',
    'trial': 'Experimental',
    'clinical trial': 'Experimental',
    'randomized': 'Experimental',
    'rct': 'Experimental',
    
    // Observational variations
    'observation': 'Observational',
    'survey': 'Observational',
    'cohort': 'Observational',
    'case study': 'Observational',
    
    // Big data variations
    'big-data': 'Big data',
    'bigdata': 'Big data',
    'large dataset': 'Big data',
    'massive data': 'Big data',
    'high volume': 'Big data',
    
    // Event history / survival variations
    'event history survival': 'Event history / survival',
    'event history/ survival': 'Event history / survival',
    'event history /survival': 'Event history / survival',
    'event history/survival': 'Event history / survival',
    'survival analysis': 'Event history / survival',
    'survival': 'Event history / survival',
    'event history': 'Event history / survival',
    'duration analysis': 'Event history / survival',
    'time to event': 'Event history / survival',
    
    // Hierarchical / multilevel variations
    'hierarchical multilevel': 'Hierarchical / multilevel',
    'hierarchical/ multilevel': 'Hierarchical / multilevel',
    'hierarchical /multilevel': 'Hierarchical / multilevel',
    'hierarchical/multilevel': 'Hierarchical / multilevel',
    'multilevel': 'Hierarchical / multilevel',
    'hierarchical': 'Hierarchical / multilevel',
    'nested': 'Hierarchical / multilevel',
    'mixed effects': 'Hierarchical / multilevel',
    'multi-level': 'Hierarchical / multilevel',
    'multi level': 'Hierarchical / multilevel',
  };
  
  // Add all variations to the map (case-insensitive)
  Object.entries(variations).forEach(([variation, validType]) => {
    variationMap.set(variation.toLowerCase(), validType);
  });
  
  return variationMap;
}

/**
 * Validates and normalizes superTypes string against allowed options
 * Returns an object with the normalized string and any warnings
 */
function validateAndNormalizeSuperTypes(superTypesStr: string): { 
  normalizedSuperTypes: string; 
  warnings: string[] 
} {
  if (!superTypesStr || typeof superTypesStr !== 'string') {
    return {
      normalizedSuperTypes: '',
      warnings: ['SuperTypes field is empty or invalid']
    };
  }

  const warnings: string[] = [];
  const inputTypes = superTypesStr.split(',').map(type => type.trim()).filter(type => type);
  const validTypes: string[] = [];
  const invalidTypes: string[] = [];
  const variationMap = createSuperTypeVariationMap();

  for (const inputType of inputTypes) {
    // Try to find a matching type using our variation map
    const matchedType = variationMap.get(inputType.toLowerCase());

    if (matchedType) {
      // Use the standardized format from our constant
      if (!validTypes.includes(matchedType)) {
        validTypes.push(matchedType);
      }
      // Warn if the input was different from the standardized format
      if (matchedType !== inputType) {
        warnings.push(`SuperType "${inputType}" normalized to "${matchedType}"`);
      }
    } else {
      invalidTypes.push(inputType);
    }
  }

  if (invalidTypes.length > 0) {
    warnings.push(`Invalid SuperTypes removed: ${invalidTypes.join(', ')}`);
  }

  if (validTypes.length === 0 && inputTypes.length > 0) {
    warnings.push('No valid SuperTypes found, field set to empty');
  }

  return {
    normalizedSuperTypes: validTypes.join(', '),
    warnings
  };
}

/**
 * Converts a CSV row to the full API body structure
 */
function convertCsvRowToApiBody(row: CsvDatasetRow): DatasetApiBody {
  const features = row.features
    .split(',')
    .map(f => f.trim())
    .filter(f => f.length > 0)
    .map(content => ({ content }));

  // Validate and normalize superTypes
  const { normalizedSuperTypes, warnings } = validateAndNormalizeSuperTypes(row.superTypes);

  const result: DatasetApiBody = {
    title: row.title,
    primaryCategoryId: row.primaryCategoryId,
    sourceId: row.sourceId,
    datasetUniqueId: row.datasetUniqueId || generateDatasetUniqueId(),
    price: parseFloat(row.price.toString()),
    isPaid: row.isPaid === true || row.isPaid.toString().toLowerCase() === 'true',
    license: row.license,
    superTypes: normalizedSuperTypes,
    aboutDatasetInfo: {
      overview: row.overview,
      description: row.description,
      dataQuality: row.dataQuality,
      dataFormatInfo: {
        rows: parseInt(row.rows.toString()),
        cols: parseInt(row.cols.toString()),
        fileFormat: row.fileFormat
      },
      features
    },
    locationInfo: {
      region: row.region,
      country: row.country,
      state: row.state,
      city: row.city
    },
    securityInfo: {
      currentEncryptionSecret: row.currentEncryptionSecret,
      masterSecret: row.masterSecret
    },
    categories: [{ id: row.primaryCategoryId }]
  };

  // Add warnings if any
  if (warnings.length > 0) {
    result.warnings = warnings;
  }

  return result;
}

/**
 * Parses a CSV file and returns an array of complete dataset API body objects.
 * Use this for the full dataset creation API.
 */
export function parseCsvToApiDatasets(file: File): Promise<DatasetApiBody[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvDatasetRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          reject(results.errors);
        } else {
          try {
            const datasets = results.data
              .filter(row =>
                Object.values(row).some(value =>
                  value !== '' && value !== null && value !== undefined && !(typeof value === 'number' && isNaN(value))
                )
              )
              .map(convertCsvRowToApiBody);
            console.log('Parsed dataset API body:', datasets);
            resolve(datasets);
          } catch (error) {
            reject(error);
          }
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
