import { RenderHTML } from '@/components/RenderHTML'

export const ClosingRemarksContent = ({ text }: {text: string}) => {
  return (
    <RenderHTML htmlString={text} />
  )
}
