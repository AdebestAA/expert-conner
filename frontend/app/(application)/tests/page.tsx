import { AccountInformationContainer } from '@/components/page-content/account/account-information-container'
import { BookmarksTable } from '@/components/page-content/account/bookmarks-table'

export default async function TestsPage() {
  return (
    <div className="flex flex-col gap-16">
      <AccountInformationContainer title="My bookmarks">
        <BookmarksTable />
      </AccountInformationContainer>
    </div>
  )
}
