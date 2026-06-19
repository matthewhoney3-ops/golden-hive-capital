export function formatUtilitiesIncluded(utilities) {
  if (!utilities?.landlordPays?.length) return null
  return `${utilities.landlordPays.join(', ')} included`
}

export function formatUtilitiesTenantPays(utilities) {
  if (!utilities?.tenantPays?.length) return null
  return `Tenant pays: ${utilities.tenantPays.join(', ')}`
}
