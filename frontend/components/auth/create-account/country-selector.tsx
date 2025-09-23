import countriesJson from '@/lib/countries.json'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'



export const CountrySelector = ({field}: { field: any }) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {countriesJson.map((country) => (
          <SelectItem key={country.code} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


