
import { type DashboardData } from './types'

export const initialData: DashboardData = {
  categories: [
    { id: 'cspm', title: 'CSPM Executive Dashboard', widgetIds: ['cloud-accounts','cloud-risk'] },
    { id: 'cwpp', title: 'CWPP Dashboard', widgetIds: ['top-ns','workload-alerts'] },
    { id: 'registry', title: 'Registry Scan', widgetIds: ['image-risk','image-issues'] }
  ],
  widgetLibrary: [
    { id: 'cloud-accounts', name: 'Cloud Accounts', text: '2 Total • Connected (2) • Not Connected (0)' },
    { id: 'cloud-risk', name: 'Cloud Account Risk Assessment', text: '9659 Total • Passed • Failed • Warning • N/A' },
    { id: 'top-ns', name: 'Top 5 Namespace Specific Alerts', text: 'No graph data available' },
    { id: 'workload-alerts', name: 'Workload Alerts', text: 'No graph data available' },
    { id: 'image-risk', name: 'Image Risk Assessment', text: '1470 Total Vulnerabilities • Critical • High • Medium' },
    { id: 'image-issues', name: 'Image Security Issues', text: '2 Total Images • Issues by severity' }
  ]
}
