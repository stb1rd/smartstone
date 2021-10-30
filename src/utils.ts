export const addLog = (label: 'ERROR' | 'SUCCESS' | 'LAUNCH') => {
  console.log(`[${label}] ${new Date().toISOString().replace('T', ' ')}`)
};
