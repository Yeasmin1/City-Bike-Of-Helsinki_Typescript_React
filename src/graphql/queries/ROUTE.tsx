import gql from 'graphql-tag'

export const RENTALSTATION = gql`
query searchStation{
        bikeRentalStations{
          name
          stationId
        }
      }
    `;

export const AVAILABLEBIKES = gql(`
query AvailableBikes($id: String!){
  bikeRentalStation(id:$id) {
    bikesAvailable
  }
}
  `);


 
