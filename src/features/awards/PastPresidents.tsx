import { PageCodes } from "app-constants"
import PageContentDetail from "features/content/PageContentDetail"
import { IDocumentSearch } from "features/documents/documentPropTypes"
import LatestOnly from "features/documents/LatestOnly"

const PastPresidents = () => {
  const query: IDocumentSearch = {
    key: "past-presidents",
    documentTypes: ["Past Presidents"],
  }

  return (
    <div>
      <PageContentDetail pageCode={PageCodes.PastPresidents} />
      <LatestOnly query={query} />
    </div>
  )
}

export default PastPresidents
