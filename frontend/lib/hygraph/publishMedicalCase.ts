import { HYGRAPH_URL } from '@/lib/hygraph/hygraph'
import { MedicalCase } from '@/interface'

interface UpdateMedicalCaseInput {
  id: string;
  table?: string;
}

async function publishMedicalCase(input: UpdateMedicalCaseInput): Promise<MedicalCase | null> {
  const { id, table} = input
  let mutationQuery:string;

  if(table === 'diagnose'){
    mutationQuery = `
    mutation{
      publishDiagnose(
        where: {id: "${id}"}
      )
      {
        id
      }
    }
  `
} else if(table === 'nonMedicationOrder'){
  mutationQuery = `
  mutation {
    publishNonMedicationOrder(
        where: {id: "${id}"}
      )
      {
        id
      }
  }
`
}else if(table === 'order'){
  mutationQuery = `
  mutation {
    publishOrder(
        where: {id: "${id}"}
      )
      {
        id
      }
  }
`
return null
}else{
    return null
  }
  
  const response = await fetch(HYGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({ query: mutationQuery }),
  })

  const json = await response.json()
  if (json.data && json.data.updateMedicalCase) {
    return json.data.updateMedicalCase
  }

  return null
}

export default publishMedicalCase