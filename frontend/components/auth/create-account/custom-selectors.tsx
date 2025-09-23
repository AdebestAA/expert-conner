import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'

const occupations = [
  { 'value': 'Physician', 'label': 'Physician' },
  { 'value': 'Dentist', 'label': 'Dentist' },
  { 'value': 'Nurse', 'label': 'Nurse' },
  { 'value': 'Nurse practitioner', 'label': 'Nurse practitioner' },
  { 'value': 'Pharmacist', 'label': 'Pharmacist' },
  { 'value': 'Physician assistant/Physician associate', 'label': 'Physician assistant/Physician associate' },
  { 'value': 'Genetic Counselor', 'label': 'Genetic Counselor' },
  { 'value': 'Other', 'label': 'Other Healthcare professional (specify)' },
]

export const OccupationSelector = ({ field }: { field: any }) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select your occupation" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {occupations.map((occupation) => (
          <SelectItem key={occupation.value} value={occupation.value}>
            {occupation.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const primarySpecializations = [
  {
    'value': 'Allergy and Immunology',
    'label': 'Allergy and Immunology',
    'secondary': [],
  },
  {
    'value': 'Anesthesiology',
    'label': 'Anesthesiology',
    'secondary': [
      { 'value': 'Pain Medicine', 'label': 'Pain Medicine' },
      { 'value': 'Critical Care Medicine', 'label': 'Critical Care Medicine' },
      { 'value': 'Pediatric Anesthesiology', 'label': 'Pediatric Anesthesiology' },
      { 'value': 'General Anesthesiology', 'label': 'General Anesthesiology' },
    ],
  },
  {
    'value': 'Cardiology',
    'label': 'Cardiology',
    'secondary': [
      { 'value': 'Electrophysiology', 'label': 'Electrophysiology' },
      { 'value': 'Interventional Cardiology', 'label': 'Interventional Cardiology' },
      { 'value': 'Heart Failure and Transplantation', 'label': 'Heart Failure and Transplantation' },
      { 'value': 'General Cardiology', 'label': 'General Cardiology' },
    ],
  },
  {
    'value': 'Cardiothoracic Surgery',
    'label': 'Cardiothoracic Surgery',
    'secondary': [],
  },
  {
    'value': 'Classical Hematology',
    'label': 'Classical Hematology',
    'secondary': [
      { 'value': 'Apheresis Medicine', 'label': 'Apheresis Medicine' },
      { 'value': 'Transfusion Medicine', 'label': 'Transfusion Medicine' },
      { 'value': 'Hemophilia and Thrombosis', 'label': 'Hemophilia and Thrombosis' },
      { 'value': 'Hemoglobinopathies', 'label': 'Hemoglobinopathies' },
      { 'value': 'Non-Malignant White Blood Cell Disorders', 'label': 'Non-Malignant White Blood Cell Disorders' },
      { 'value': 'Red Cell Disorders', 'label': 'Red Cell Disorders' },
      { 'value': 'General Hematology (Non malignant)', 'label': 'General Hematology (Non malignant)' },
    ],
  },
  {
    'value': 'Dermatology',
    'label': 'Dermatology',
    'secondary': [
      { 'value': 'Dermatopathology', 'label': 'Dermatopathology' },
      { 'value': 'Pediatric Dermatology', 'label': 'Pediatric Dermatology' },
      { 'value': 'Mohs Surgery', 'label': 'Mohs Surgery' },
      { 'value': 'General Dermatology', 'label': 'General Dermatology' },
    ],
  },
  {
    'value': 'Emergency Medicine',
    'label': 'Emergency Medicine',
    'secondary': [
      { 'value': 'Medical Toxicology', 'label': 'Medical Toxicology' },
      { 'value': 'Pediatric Emergency Medicine', 'label': 'Pediatric Emergency Medicine' },
      { 'value': 'Sports Medicine', 'label': 'Sports Medicine' },
      { 'value': 'General Emergency Medicine', 'label': 'General Emergency Medicine' },
    ],
  },
  {
    'value': 'Endocrinology',
    'label': 'Endocrinology',
    'secondary': [
      { 'value': 'Pediatric Endocrinology', 'label': 'Pediatric Endocrinology' },
      { 'value': 'Diabetes Care', 'label': 'Diabetes Care' },
      { 'value': 'Reproductive Endocrinology', 'label': 'Reproductive Endocrinology' },
      { 'value': 'Neuroendocrinology', 'label': 'Neuroendocrinology' },
      { 'value': 'Bone and Mineral Metabolism', 'label': 'Bone and Mineral Metabolism' },
      { 'value': 'Thyroidology', 'label': 'Thyroidology' },
      { 'value': 'Adrenal Disorders', 'label': 'Adrenal Disorders' },
      { 'value': 'Pituitary Disorders', 'label': 'Pituitary Disorders' },
    ],
  },
  {
    'value': 'Gastroenterology',
    'label': 'Gastroenterology',
    'secondary': [
      { 'value': 'Advanced Endoscopy', 'label': 'Advanced Endoscopy' },
      { 'value': 'Inflammatory Bowel Disease', 'label': 'Inflammatory Bowel Disease' },
      { 'value': 'Intestinal Transplantation', 'label': 'Intestinal Transplantation' },
      { 'value': 'General Gastroenterology', 'label': 'General Gastroenterology' },
    ],
  },
  {
    'value': 'General Practice/Family Medicine',
    'label': 'General Practice/Family Medicine',
    'secondary': [],
  },
  {
    'value': 'Genetics',
    'label': 'Genetics',
    'secondary': [],
  },
  {
    'value': 'Geriatric Medicine',
    'label': 'Geriatric Medicine',
    'secondary': [],
  },
  {
    'value': 'Hematology (Adult)',
    'label': 'Hematology (Adult)',
    'secondary': [
      { 'value': 'Bone Marrow Transplantation', 'label': 'Bone Marrow Transplantation' },
      { 'value': 'General Hematology (Adult)', 'label': 'General Hematology (Adult)' },
    ],
  },
  {
    'value': 'Hematology (Pediatric)',
    'label': 'Hematology (Pediatric)',
    'secondary': [
      { 'value': 'Bone Marrow Transplantation', 'label': 'Bone Marrow Transplantation' },
      { 'value': 'General Hematology (Pediatric)', 'label': 'General Hematology (Pediatric)' },
    ],
  },
  {
    'value': 'Hepatology',
    'label': 'Hepatology',
    'secondary': [
      { 'value': 'Transplant Hepatology', 'label': 'Transplant Hepatology' },
      { 'value': 'General Hepatology', 'label': 'General Hepatology' },
    ],
  },
  {
    'value': 'Hospice and Palliative Medicine',
    'label': 'Hospice and Palliative Medicine',
    'secondary': [],
  },
  {
    'value': 'Infectious Diseases',
    'label': 'Infectious Diseases',
    'secondary': [
      { 'value': 'HIV/AIDS', 'label': 'HIV/AIDS' },
      { 'value': 'General Infectious Diseases', 'label': 'General Infectious Diseases' },
    ],
  },
  {
    'value': 'Intensive Care Medicine',
    'label': 'Intensive Care Medicine',
    'secondary': [
      { 'value': 'Neurocritical Care', 'label': 'Neurocritical Care' },
      { 'value': 'Cardiothoracic Critical Care', 'label': 'Cardiothoracic Critical Care' },
      { 'value': 'Medical Critical Care', 'label': 'Medical Critical Care' },
      { 'value': 'Surgical Critical Care', 'label': 'Surgical Critical Care' },
      { 'value': 'Trauma Critical Care', 'label': 'Trauma Critical Care' },
      { 'value': 'Pediatric Critical Care', 'label': 'Pediatric Critical Care' },
      { 'value': 'Burn Intensive Care', 'label': 'Burn Intensive Care' },
    ],
  },
  {
    'value': 'Internal Medicine',
    'label': 'Internal Medicine',
    'secondary': [
      { 'value': 'Geriatric Medicine', 'label': 'Geriatric Medicine' },
      { 'value': 'Sports Medicine', 'label': 'Sports Medicine' },
      { 'value': 'Palliative Medicine', 'label': 'Palliative Medicine' },
      { 'value': 'General Internal Medicine', 'label': 'General Internal Medicine' },
    ],
  },
  {
    'value': 'Interventional Radiology',
    'label': 'Interventional Radiology',
  },
  {
    value: 'Medical Oncology',
    label: 'Medical Oncology',
  },
  {
    value: 'Nephrology',
    label: 'Nephrology',
    secondary: [
      { value: 'Transplant Nephrology', label: 'Transplant Nephrology' },
      { value: 'Pediatric Nephrology', label: 'Pediatric Nephrology' },
      { value: 'Interventional Nephrology', label: 'Interventional Nephrology' },
      { value: 'General Nephrology', label: 'General Nephrology' },
    ],
  },
  {
    value: 'Neurology',
    label: 'Neurology',
    secondary: [
      { value: 'Neuromuscular Medicine', label: 'Neuromuscular Medicine' },
      { value: 'Neurocritical Care', label: 'Neurocritical Care' },
      { value: 'Epilepsy', label: 'Epilepsy' },
      { value: 'General Neurology', label: 'General Neurology' },
      { value: 'Pediatric Neurology', label: 'Pediatric Neurology' },
    ],
  },
  { value: 'Nuclear Medicine', label: 'Nuclear Medicine' },
  {
    value: 'Obstetrics and Gynecology',
    label: 'Obstetrics and Gynecology',
    secondary: [
      { value: 'Maternal-Fetal Medicine', label: 'Maternal-Fetal Medicine' },
      { value: 'Gynecologic Oncology', label: 'Gynecologic Oncology' },
      { value: 'Reproductive Endocrinology and Infertility', label: 'Reproductive Endocrinology and Infertility' },
      { value: 'General Obstetrics and Gynecology', label: 'General Obstetrics and Gynecology' },
    ],
  },
  {
    value: 'Ophthalmology',
    label: 'Ophthalmology',
    secondary: [
      { value: 'Cornea and External Disease', label: 'Cornea and External Disease' },
      { value: 'Retina/Vitreous Surgery', label: 'Retina/Vitreous Surgery' },
      { value: 'Glaucoma', label: 'Glaucoma' },
      { value: 'General Ophthalmology', label: 'General Ophthalmology' },
      { value: 'Others Ophthalmology', label: 'Others Ophthalmology' },
    ],
  },
  { value: 'Other', label: 'Other' },
  {
    value: 'Otolaryngology (ENT)',
    label: 'Otolaryngology (ENT)',
    secondary: [
      { value: 'Otology/Neurotology', label: 'Otology/Neurotology' },
      { value: 'Head and Neck Surgery', label: 'Head and Neck Surgery' },
      { value: 'Pediatric Otolaryngology', label: 'Pediatric Otolaryngology' },
      { value: 'General Otolaryngology (ENT)', label: 'General Otolaryngology (ENT)' },
    ],
  },
  {
    value: 'Pathology',
    label: 'Pathology',
    secondary: [
      { value: 'Hematopathology', label: 'Hematopathology' },
      { value: 'Neuropathology', label: 'Neuropathology' },
      { value: 'General Pathology', label: 'General Pathology' },
    ],
  },
  {
    value: 'Pediatrics',
    label: 'Pediatrics',
    secondary: [
      { value: 'Neonatology', label: 'Neonatology' },
      { value: 'Pediatric Cardiology', label: 'Pediatric Cardiology' },
      { value: 'Pediatric Endocrinology', label: 'Pediatric Endocrinology' },
      { value: 'Pediatric Infectious Diseases', label: 'Pediatric Infectious Diseases' },
      { value: 'Pediatric Neurology', label: 'Pediatric Neurology' },
      { value: 'General Pediatrics', label: 'General Pediatrics' },
    ],
  },
  {
    value: 'Plastic Surgery',
    label: 'Plastic Surgery',
    secondary: [],
  },
  {
    value: 'Pancreatology',
    label: 'Pancreatology',
    secondary: [
      { value: 'Pancreas Transplantation', label: 'Pancreas Transplantation' },
      { value: 'General Pancreatology', label: 'General Pancreatology' },
    ],
  },
  {
    value: 'Psychiatry',
    label: 'Psychiatry',
    secondary: [
      { value: 'Child and Adolescent Psychiatry', label: 'Child and Adolescent Psychiatry' },
      { value: 'Forensic Psychiatry', label: 'Forensic Psychiatry' },
      { value: 'Geriatric Psychiatry', label: 'Geriatric Psychiatry' },
      { value: 'General Psychiatry', label: 'General Psychiatry' },
    ],
  },
  {
    value: 'Public Health',
    label: 'Public Health',
  },
  {
    value: 'Pulmonology',
    label: 'Pulmonology',
    secondary: [
      { value: 'Lung Transplantation', label: 'Lung Transplantation' },
      { value: 'General Pulmonology', label: 'General Pulmonology' },
    ],
  },
  {
    value: 'Radiation Oncology',
    label: 'Radiation Oncology',
    secondary: [],
  },
  {
    value: 'Radiology',
    label: 'Radiology',
    secondary: [
      { value: 'Interventional Radiology', label: 'Interventional Radiology' },
      { value: 'Neuroradiology', label: 'Neuroradiology' },
      { value: 'Pediatric Radiology', label: 'Pediatric Radiology' },
      { value: 'General Radiology', label: 'General Radiology' },
    ],
  },
  {
    value: 'Rehabilitation Medicine',
    label: 'Rehabilitation Medicine',
  },
  {
    value: 'Rheumatology',
    label: 'Rheumatology',
  },
  {
    value: 'Sleep Medicine',
    label: 'Sleep Medicine',
    secondary: [
      { value: 'Sleep Medicine', label: 'Sleep Medicine' },
      { value: 'Critical Care Medicine', label: 'Critical Care Medicine' },
      { value: 'Pulmonary Hypertension', label: 'Pulmonary Hypertension' },
      { value: 'General Sleep Medicine', label: 'General Sleep Medicine' },
    ],
  },
  {
    value: 'Sports Medicine',
    label: 'Sports Medicine',
  },
  {
    value: 'Surgery',
    label: 'Surgery',
    secondary: [
      { value: 'Bariatric Surgery', label: 'Bariatric Surgery' },
      { value: 'Trauma Surgery', label: 'Trauma Surgery' },
      { value: 'Colorectal Surgery', label: 'Colorectal Surgery' },
      { value: 'General Surgery', label: 'General Surgery' },
    ],
  },
  {
    value: 'Transplantation (solid organ)',
    label: 'Transplantation (solid organ)',
    secondary: [],
  },
  {
    value: 'Trauma and Orthopedics',
    label: 'Trauma and Orthopedics',
    secondary: [
      { value: 'Sports Medicine', label: 'Sports Medicine' },
      { value: 'Spine Surgery', label: 'Spine Surgery' },
      { value: 'Hand Surgery', label: 'Hand Surgery' },
      { value: 'General Trauma and Orthopedics', label: 'General Trauma and Orthopedics' },
    ],
  },
  {
    value: 'Urology',
    label: 'Urology',
    secondary: [
      { value: 'Pediatric Urology', label: 'Pediatric Urology' },
      { value: 'Urologic Oncology', label: 'Urologic Oncology' },
      {
        value: 'Female Pelvic Medicine and Reconstructive Surgery',
        label: 'Female Pelvic Medicine and Reconstructive Surgery',
      },
      { value: 'General Urology', label: 'General Urology' },
    ],
  },
  {
    value: 'Vascular Surgery',
    label: 'Vascular Surgery',
  },
]


//
export const hasSecondarySpecializations = (primarySpecialization: string) => {
  // @ts-expect-error
  return primarySpecializations.find((specialization) => specialization.value === primarySpecialization)?.secondary?.length > 0
}

export const SpecializationSelector = ({ field, isSecondary, selectedPrimarySpecialization }: {
  field: any,
  isSecondary: boolean,
  selectedPrimarySpecialization?: string
}) => {
  const data = isSecondary
    ? primarySpecializations.find((specialization) => specialization.value === selectedPrimarySpecialization)?.secondary
    : primarySpecializations

  if (data?.length === 0 || data?.length === undefined) return null
  return (
    <>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={isSecondary ? 'Secondary specialization' : 'Primary Specialization'} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data?.map((specialization) => (
            <SelectItem key={specialization.value} value={specialization.value}>
              {specialization.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>

  )
}

