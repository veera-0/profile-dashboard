export const environment = {
  production: false,
  get supabaseUrl() {
    return (window as any).__env?.supabaseUrl || '';
  },
  get supabaseKey() {
    return (window as any).__env?.supabaseKey || '';
  }
}
