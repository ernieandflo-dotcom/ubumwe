// ============================================================
// UBUMWE — Role & Auth Scaffolding
//
// Current state: mock user + client-side role checks.
// Future state: replace CURRENT_USER with a real auth context
// (Supabase, Firebase, Auth0, etc.). The canView() function
// and ROLE_RANK map will not need to change.
// ============================================================

// Rank map — higher number = more access
export const ROLE_RANK = {
  member: 1,
  editor: 2,
  admin:  3,
}

// Mock current user — replace with useAuth() hook when auth is implemented
export const CURRENT_USER = {
  initials: 'MN',
  name:     'Marie N.',
  role:     'member', // 'member' | 'editor' | 'admin'
}

/**
 * Returns true if the user's role meets or exceeds the required minimum role.
 * @param {string|undefined} minRole - minimum role required (undefined = open to all members)
 * @param {string} userRole - the current user's role
 */
export function canView(minRole, userRole) {
  if (!minRole) return true
  return (ROLE_RANK[userRole] ?? 0) >= (ROLE_RANK[minRole] ?? 99)
}
