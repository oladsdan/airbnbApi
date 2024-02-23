import { EmptyState } from "../../components";
import { useContext, useMemo, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReservationClient from "./ReservationClient";
 

const ReservationsPage = () => {
  const {authUser, reservationReload} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [usersReservations, setUsersReservations] = useState([])

    useMemo(()=> {
      axiosPrivate.get('/api-reservations/owners')
      .then((response) => {
        setUsersReservations(response?.data)
      })
    }, [authUser, reservationReload])
  

    if(!authUser){
        return (
            <EmptyState title="Unauthorized"
            subtitle="Please login" />
        )
    }

    if(usersReservations.length === 0){
      return (
        <EmptyState 
          title="No Reservations Found"
          subtitle="Looks like you have no reservations on your properties" />
      )
    }



    return (
      <ReservationClient
      reservations={usersReservations}
      currentUser={authUser} />
    )
   
}

export default ReservationsPage