/* La función registerRootComponent nos sirve para registrar la aplicación, es decir,
poder ejecutarla y compilarla. */
import { registerRootComponent } from 'expo'

import App from './App'

/* registerRootComponent llama a AppRegistry.registerComponent('main', () => App)
y asegura que si cargas la aplicación en Expo Go o en una construcción nativa, 
el entorno está configurado adecuadamente. */
registerRootComponent(App)
