const api_key = "bTcJzGafJ6kHEXNcZvT0ReTsl3OddHQ3";

const get_weather = async (key) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const location_key = `${key}?apikey=${api_key}`;

    const response = await fetch(base + location_key);
    const data = await response.json();
    return data[0];
};

const get_city = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${api_key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0]; 
    
};