'use client'

export const TagChip= ({ title }: { title: string | null},
) => {

  return (
    <div className='p-1 bg-[#1026C40A] rounded-lg w-fit border-2'>
      {title}
    </div>
  )
}