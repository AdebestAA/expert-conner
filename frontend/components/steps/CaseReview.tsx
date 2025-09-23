import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect } from 'react'
import { useCaseContext } from '@/lib/context/caseContext'
import { RenderHTML } from '../RenderHTML'
import { Title } from '@/components/Title'
import { checkEmptyRichText } from '@/lib/utils';

export const CaseReview = ({setDiagnosisUrl}: {setDiagnosisUrl: React.Dispatch<React.SetStateAction<string>>}) => {
  const { medicalCase } = useCaseContext()

  
  useEffect(() => {
    medicalCase?.diagnose.forEach((diagnosis) => {
      if(diagnosis.reviewed){
        setDiagnosisUrl(diagnosis.url)
      }
    })
  }, [medicalCase, setDiagnosisUrl])
  return (
    <div>
      <CaseReviewTabs />
    </div>
  )
}


const CaseReviewTabs = () => {
  const { medicalCase } = useCaseContext()

  const hasClosingRemarks = () => {
    return medicalCase?.closingRemarks && !checkEmptyRichText(medicalCase?.closingRemarks.html)
  }

  const hasLiteratureReview = () => {
    return medicalCase?.literatureReview && !checkEmptyRichText(medicalCase?.literatureReview.html)
  }

  const hasReferences = () => {
    return medicalCase?.references && !checkEmptyRichText(medicalCase?.references.html)
  }

  return (
    <>
      <Title title="Case Review" />
      <Tabs
        defaultValue={hasClosingRemarks() ? 'closing-remarks' : hasLiteratureReview() ? 'literature-review' : 'references'}
        className="mt-4"
      >
        <TabsList variant="default">
          {hasClosingRemarks() && (
            <TabsTrigger value="closing-remarks">Closing Remarks</TabsTrigger>
          )}
          {hasLiteratureReview() && (
            <TabsTrigger value="literature-review">Literature Review</TabsTrigger>
          )}
          {hasReferences() && (
            <TabsTrigger value="references">References</TabsTrigger>
          )}

        </TabsList>
        {hasClosingRemarks() && (
          <TabsContent value="closing-remarks">
            <RenderHTML htmlString={medicalCase?.closingRemarks?.html!} />
          </TabsContent>
        )}
        {hasLiteratureReview() && (
          <TabsContent value="literature-review">
            <RenderHTML htmlString={medicalCase?.literatureReview?.html!} />{' '}
          </TabsContent>
        )}
        {hasReferences() && (
          <TabsContent value="references">
            {' '}
            <RenderHTML
              htmlString={medicalCase?.references?.html!}
              className="references"
            />
          </TabsContent>
        )}

        {/* <TabsContent value="performance-analysis">
        <PerformanceAnalysisContent  />
      </TabsContent> */}
        {/* <TabsContent value="peer-stats">
        <PeerStats  />
        <CaseReviewPeersTestTable />
      </TabsContent> */}
      </Tabs>
    </>
  )
}
