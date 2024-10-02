import 'dotenv/config'; // This will load variables from the .env file

export default ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY, // Inject the Google Maps API key from .env
      },
    },
  },
  ios: {
    ...config.ios,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // Inject the Google Maps API key for iOS
    },
  },
});