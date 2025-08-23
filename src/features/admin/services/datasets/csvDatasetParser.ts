import Papa from 'papaparse';
import { generateDatasetUniqueId } from '@/shared/utils/uuidGenerator';

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

  return {
    title: row.title,
    primaryCategoryId: row.primaryCategoryId,
    sourceId: row.sourceId,
    datasetUniqueId: row.datasetUniqueId || generateDatasetUniqueId(),
    price: parseFloat(row.price.toString()),
    isPaid: row.isPaid === true || row.isPaid.toString().toLowerCase() === 'true',
    license: row.license,
    superTypes: row.superTypes,
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
