import sanityClient from './sanity';
let sanityQuery = (query, params)=> sanityClient.fetch(query, params);

export const getFeaturedRestaurants = async(selectedLocation)=>{
    console.log("rahul3", selectedLocation);
    const { latitude, longitude } = selectedLocation;
    const result = await sanityQuery(`
        *[_type == 'featured'] {
            ...,
            restaurants[]->{
                ...,
                type->{
                    name
                },
                dishes[]->
            }
        }
    `);

    const filteredResult = result.map(featuredItem => {
        const filteredRestaurants = featuredItem.restaurants.filter(restaurant => {
            const distance = calculateDistance(latitude, longitude, restaurant.lat, restaurant.lng);
            console.log("rr1", restaurant.name, restaurant.distance);
            return distance <= 10; // Assuming a 10 km radius for proximity
        });

        return { ...featuredItem, restaurants: filteredRestaurants };
    });

    return filteredResult;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export const getCategories = ()=>{
    return sanityQuery(`
        *[_type == 'category']
    `);
}

export const getFeaturedRestaurantById = id=>{
    return sanityQuery(`
        *[_type == 'featured' && _id == $id] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]
    `, {id})
}