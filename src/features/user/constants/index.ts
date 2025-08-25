// Dataset supertype options for filtering - matches backend DatasetSuperTypeOptions
export const datasetSuperTypeOptions = [
  'Cross-sectional',
  'Time-series',
  'Panel',
  'Pooled cross-sectional',
  'Repeated cross-sections',
  'Spatial',
  'Spatio-temporal',
  'Experimental',
  'Observational',
  'Big data',
  'Event history / survival',
  'Hierarchical / multilevel',
] as const;

export type DatasetSuperType = typeof datasetSuperTypeOptions[number];
