import { ProfileService } from '@/services/profile-service'
import { useQuery } from '@tanstack/react-query'
import { get } from 'lodash'

const useProfile = () => {

  const { data, refetch } = useQuery({
    queryKey: ["/profile"],
    queryFn: () => ProfileService.getUserProfile()
  })

  const userProfileData = get(data, "data") ? get(data, "data", {}) : {}


  return { userProfileData, refetch }
}

export default useProfile