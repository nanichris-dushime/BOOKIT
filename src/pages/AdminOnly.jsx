import { DashboardLayout } from '../layouts/DashboardLayout'
import { AdminDashboardPage } from './AdminDashboardPage'

export function AdminOnly() {
  return (
    <DashboardLayout>
      <AdminDashboardPage />
    </DashboardLayout>
  )
}
