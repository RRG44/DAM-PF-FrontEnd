import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, FlatList, Alert, View, SafeAreaView, BackHandler,  useColorScheme, ScrollView} from 'react-native';

import { lightColors, darkColors } from './colors/colorsPalettes.jsx';
import { Subtitle, Title} from '../components/index.jsx';

export default function App({navigation}){

  const data = [
    { id: '1', title: 'Datos EXIF', 
    content: 'El crecimiento mundial y alta disponibilidad a la que nos enfrentamos actualmente al uso de cámaras profesionales como las disponibles en celulares inteligentes logramos capturas grandiosas imágenes, estas fotografías aunque de primer instancia podríamos pasar desapercibido tenemos información importante llamada datos EXIF o metadatos es muy utilizada por fotógrafos profesionales para saber los ajustes de una fotografía ofreciendo información del ajuste del lente, el modelo, entre otros datos que lograron el resultado de la fotografía, pero no es todo lo que incluye también comparte información vulnerable como la localización en la cual se tomo la foto, por que dispositivo fue tomada, la hora y fecha información que podría ser utilizada para distintos propósitos. \n\n'
            +'El formato EXIF (Exchangeable Image File Format) define un conjunto de etiquetas TIFF (Tagged Image File Format) para describir imágenes fotográficas. La especificación usa los formatos de archivos existentes como JPEG y TIFF. Todos los archivos JPEG comienzan con el valor binario 0xFFD8 (SOI - Start Of Image) y terminan con 0xFFD9 (EOI - End Of Image). SOI y EOI son marcadores que no tienen datos posteriores a diferencia de los otros restantes que tienen una estructura fija y datos asociados. \n\n'
            +'Según Hartel y Thomson (2011), algunos autores consideran cuestionable mantener el término “fotografía” en el contexto de los ciber medios. Estos autores proponen distinguir exclusivamente entre informaciones textuales e informaciones visuales, definiendo el contenido visual como un contenedor que abarca las aportaciones de la fotografía, la ilustración, la infografía, el vídeo y las técnicas de 3D. Según su perspectiva, categorizar la imagen fotográfica como un contenido visual más permite situar los modelos analíticos desarrollados por las ciencias sociales en el eje del estudio teórico del mensaje visual (Freixa, 2013). \n\n'
            +'Como explican algunos autores, los datos EXIF mejor explicados son metadatos habitualmente son denominados “datos sobre los datos”, es decir información de interés que complementa el contenido principal de un documento digital. Las imágenes digitales son almacenadas en una gran variedad de formatos como TIFF, JPEG, PSD o RAW entre otros. Cada formato de imagen tiene distintas reglas de como los distintos formatos de metadatos son almacenados junto al propio archivo que contiene la imagen. Algunos de los distintos contenedores de metadatos para los distintos formatos son: IFDs Exif/TIFF, Adobe XMP e IPTC-IIM. Cada uno de estos contenedores de metadatos tiene un formato propio que indica las propiedades de los metadatos que son almacenadas, el orden y su codificación en el contenedor. En cada contenedor suele haber una subdivisión con criterios semánticos. Estos grupos semánticos se dividen a su vez en propiedades de metadatos individuales. Cada propiedad tiene asociada unos tipos de datos específicos como pueden ser cadenas de caracteres, números o vectores. Las cadenas de copyright pueden ser almacenadas por varios contenedores con similar información, pero posiblemente con una semántica o estructura sutilmente distinta. (Sandoval Orozco et al., 2012).\n\n'
            +'La seguridad de los datos EXIF es algo que tiene en consideración la seguridad digital la manipulación o el uso de estos para investigaciones han llegado a tratos con distintas paginas de internet como lo son las redes social ejemplo de ello en 2016 Facebook queda obligado por sentencia judicial a dejar intactos los metadatos de las fotos que suben los usuarios con el fin de comprobar la autenticidad de las imágenes. Como la mayoría de los celulares inteligentes y ahora también las cámaras están equipadas con funciones GPS, y algunas imágenes incluyen geo etiquetas y direcciones IP, se debería considerar antes esto al publicar imágenes con los metadatos en la web. Si no deseamos mostrar detalles delicados de las fotos se recomienda la eliminación de la información de las imágenes mediante las herramientas EXIF disponibles en varias herramientas como Secure Surf.\n\n'
            +'\n\n'
          },

    { id: '2', title: 'Cookies y Rastreadores', 
    content: 'Las cookies a menudo usadas en internet mediante navegadores son archivos de texto que son utilizadas para identificarse en el navegador y estas su principal razón es para dar eficacia y mejorar la experiencia de usuario recordando contraseñas, eventos utilizados con anterioridad dentro de la página. La mayoría de las cookies son utilizadas para la comodidad del usuario, pero no descarta el uso que podrían dar los ciberdelincuentes para rastrear el navegador. \n\n' 
            +'Si traen riesgos el uso de cookies a la navegación por que los seguimos ocupando, bueno su uso se debe a la gestión de inicio de sesión, cuantos de nosotros es engorroso recordar contraseña y preferimos que el navegador las recuerde. Personalización de anuncios, rastreadores que rastrean y supervisan los datos analíticos de rendimiento, como cuántas veces has visitado una página o cuánto tiempo has pasado en ella. \n\n'
            +'\n Cookies \n\n'
            +'Dentro de las cookies tenemos categorías según su tiempo de actividad; Las de sesión anteriormente mencionadas que se almacenan en la memoria de acceso aleatorio. Las cookies persistentes que se almacenan en el ordenador de forma indefinida, pero con un tiempo de caducidad. Las cookies de origen, creadas directamente por el sitio web que estás utilizando. Suelen ser más seguras por estar en sitios como https, pero siempre revisar que no se hayan visto vulnerados por una filtración de datos o un ciberataque recientes. Las cookies de terceros, Provienen de sitios web distintos de los que los usuarios están visitando en ese momento, normalmente porque están vinculadas a anuncios de esa página. Las cookies de terceros permiten a las empresas de publicidad o de análisis realizar un seguimiento del historial de navegación de una persona por toda la web en cualquier sitio que tenga sus anuncios. Las supercookies persistente de terceros que se instalan permanentemente en los ordenadores de los usuarios. Tienen la capacidad única de reaparecer después de haber sido "borradas" del ordenador.  \n\n'
            +'Las cookies forman parte del protocolo HTTP, que es el protocolo que se utilizan para navegar en paginas web. Utilizando solicitudes y respuestas son usados para intercambiar mensajes entre el servidor y el cliente. Las cookies se implementaron como respuesta a las solicitudes de una repetida consulta de página web como solución a la rápida respuesta y configuración del usuario. \n\n'
            +'La estructura de una cookie se nombra Set-Cookie y está compuesta por el nombre=valor, domain=nombre_dominio, expires=fecha_vencimiento_cookie.  \n\n'
            +'\n Tipos de cookies según su finalidad. \n\n'
            +'  • Técnicas: \n'
            +'Aquellas que permiten al usuario la navegación a través de una pagina web, plataforma web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan y habilitar sus funciones y servicios.\n\n'
            +'  • Preferencias o personalización: \n'
            +'Aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios. \n\n'
            +'  • Análisis o medición: \n'
            +'Son aquellas que permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas, incluida la cuantificación de los impactos de los anuncios. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.\n\n'
            +'  • Publicidad comportamental: \n'
            +'Almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil especifico para publicitar en función del mismo. \n\n'
            +'\n Limitaciones de las cookies. \n\n'
            +' • El numero total se limita a 300\n'
            +' • El tamaño máximo es de 4Kb\n'
            +' • Un máximo de 20 cookies por dominio \n\n'
            +'\n Un rastreador al igual que las cookies son parte de la navegacion y funcioan de la siguiente manera cada uno con su tipos de rastreadores (Tracking) \n\n'
            +' • Seguimiento de direcciones IP \n'
            +'La dirección IP es un identificador del dispositivo en internet. Dado que la IP indica la ubicación física general, los sitios web utilizan el seguimiento de IP para controlar de donde provienen sus visitantes. También pueden utilizar direcciones IP para identificar patrones de comportamiento y determinar si las visitas repetidas proceden de la misma persona.\n\n'
            +' • Web beacons: \n'
            +'Sitios web y los correos electrónicos utilizan web beacons, formato de una imagen grafica transparente de un solo pixel, para registrar el comportamiento del usuario.\n\n'
            +' • Browser fingerprinting: \n\n'
            +'Cuando se conecta a un sitio web, el navegador transmite una gran cantidad de datos que el sitio web utiliza para optimizar su experiencia. Estos datos incluyen el modelo del dispositivo, resolución de pantalla, el sistema operativo, el idioma preferido, historial, zona horaria, complementos utilizados y demás información adicional.\n\n'
            +'\n Vulnerabilidades en la seguridad.  \n\n'
            +'El Robo de cookies, durante el funcionamiento normal, las cookies se envían en el bidireccional entre servidores (o grupo de servidores en el mismo dominio) y el ordenador del usuario que está navegando. Dado que las cookies pueden contener información confidencial (nombre de usuario, un token utilizado para la autenticación, etc.), sus valores no deberían ser accesibles desde otras computadoras. Sin embargo, Las cookies enviadas a través de sesiones HTTP normales son visibles para todos. usuarios que pueden escuchar en la red utilizando un rastreador de paquetes. Estas cookies no deben contener información sensible. Este problema se puede resolver usando https, que invoca la seguridad de la capa de transporte para cifrar la conexión. \n\n'
            +'Tiendas online fraudulentas, Cuando navegamos por internet, las cookies de terceros registran todas las búsquedas que realizamos, por ejemplo de productos y servicios. Usando estos datos, almacenados, se puede producir un fraude en el que los usuarios es redirigido a tiendas fraudulentas mediante publicidad engañosa que le muestra artículos buscados a precios muy bajos. \n\n'
            +'Fake news, existe otra variante en la que incitan a los usuarios a la visualización de videos de carácter sesgado o sensacionalista en una pagina web de un propietario o video subido en alguna plataforma. Su objetivo es ganar dinero gracias a la publicidad y el tráfico que recibe. \n\n'
            +'Robo de cookies o secuestro de sesión, se introduce una cookie modificada en el navegador del usuario que ha visitado una pagina web fraudulenta. Después, cuando accede a un sitio web que necesita introducir credenciales la cookie modificada se hace pasar por la cookie legitima, obteniendo los datos de autentificación del usuario. \n\n'
            +'\n Medidas para la prevención del robo de cookies:  \n\n'
            +' • Usar la navegación privada \n'
            +' • Eliminar las cookies del navegador periódicamente \n'
            +' • Cerrar sesión de todos los sitios web cuando dejamos de usarlo, para que esa cookie caduque y ya no pueda ser eliminada \n'
            +' • Usar extensiones en el navegador que bloquean y borran las cookies: Vainilla Cookies Manager, Ghostery, Cookie AutoDelete\n'
          },

    { id: '3', title: 'Malware y tipos de malware', 
    content: 'El malware como su nombre lo indica es software malicioso que describe a un programa malicioso que es dañino para los sistemas, similar a los virus para los humanos. El malware pueda actuar de diferentes formas siendo muy hostil, intrusivo evadiendo el sistema que intenta detectarlo, además daña o deshabilita sistemas informáticos, redes, ordenadores y dispositivos móviles. \n\n'
            +'\n ¿Cómo se que tengo virus en mi dispositivo móvil? \n\n'
            +' • Se calienta: \n'
            +'Los componentes internos de tu dispositivo empiezan a trabajar inmediatamente con más intensidad debido al malware o el virus que lo afecta. \n\n'
            +' • Cada vez más lento: \n'
            +'Puede hacer que los sitios web se carguen más lentamente, que las aplicaciones se bloqueen o que la batería no mantenga la carga. El rendimiento general sigue siendo lento, no importa cuántas veces se reinicie el dispositivo o cuántos archivos grandes se eliminen.\n\n'
            +' • Se te abren páginas solas y se instalan aplicaciones solas en tu celular.  \n'
            +'Si tu dispositivo alberga una aplicación maliciosa o un virus, podrías notar que se te abren páginas solas o ventanas emergentes (más de lo habitual) en tu celular.\n\n'
            +' • Enlaces fraudulentos desde tus cuentas \n'
            +'Una poderosa táctica diseñada para ir propagando el malware a tus contactos, y desde ellos a tus contactos, y así sucesivamente. Esto puede suceder mediante el correo electrónico o, más comúnmente, mediante tus cuentas de redes sociales. \n\n'
            +' • Encuentras gastos no autorizados \n'
            +'Si observas cargos no autorizados en los extractos de tu tarjeta de crédito o de tu banco, indaga más. Puede tratarse de una aplicación maliciosa que realiza compras en tu nombre o de un programa malicioso que se ha apropiado de tus datos personales para efectuar compras fraudulentas. \n\n'
            +'\n Tipos de malware. \n\n'
            +' • Virus: \n'
            +'Se adhiere a otros programas, se autorreplica y se propaga de una unidad a otras \n\n'
            +' • Malware: \n'
            +'Son programas diseñados por ciberdelincuentes para causar un daño o perjudicar como un robo de información \n\n'
            +' • Spyware: \n'
            +'Cualquier componente de software malicioso que infecta el ordenador espía sus datos personales \n\n'
            +' • RootKits\n'
            +'Son herramientas que sirven para esconder los procesos y archivos que permiten al intruso mantener el acceso a distancia \n\n'
            +' • Backdoors: \n'
            +'Programa que permite una trasera a través de la cual es posible controlar el sistema afectado sin conocimiento del usuario \n\n'
            +' • Troyanos\n'
            +'Componente de un “software malware” disfrazado de genuino que intenta afectar su ordenador y alterar sus archivos y datos.\n\n'
            +' • Gusanos: \n'
            +'Subclase de virus, su objetico es colapsar los ordenadores y las redes informáticas \n\n'
            +' • Keloggers:\n'
            +'Realizan un seguimiento y registran cada tecla que se presiona en una computadora sin el permiso ni el conocimiento del usuario.\n\n'
            +'\n Como evitar los malware. \n\n'
            +'• Mantente al tanto de las actualizaciones. \n'
            +'• Utiliza contraseñas fuertes y exclusivas. \n'
            +'• Borra el historial de navegación.\n'
            +'• Bloquea la configuración y limita los permisos de las aplicaciones.\n'
            +'• Conoce tus aplicaciones y solo instala aplicaciones oficiales en tiendas de aplicaciones vinculadas verificadas.\n'
            +'• No hagas clic en cualquier enlace. No te apresures y observa tu entorno digital. Las estafas de phishing que cargan malware y virus en tus celulares suelen llegar en correos electrónicos, mensajes de texto o a través de tus círculos de confianza en las redes sociales. \n'
          },

    { id: '4', title: 'OSINT', 
    content: 'Podríamos decir que aplicamos OSINT para conseguir toda la información disponible en cualquier fuente pública sobre una empresa, persona física o cualquier otra cosa sobre la que queremos hacer una investigación, y haciendo que todo el cúmulo de datos se convierta en inteligencia que nos sirva para ser más eficaces a la hora de obtener un resultado. Dados algunos datos de entrada, junto con la aplicación de técnicas avanzadas de recopilación y análisis, OSINT amplía continuamente el conocimiento sobre el objetivo. En esto de esta manera, la información encontrada alimenta nuevamente el proceso de recolección. \n\n' 
            +'\n Metodología. \n\n'
            +'En primer lugar, en la fase de recopilación, los datos disponibles públicamente se recuperan de fuentes abiertas relevantes según el objetivo u objetivo. En particular, Internet es el recurso por excelencia debido al volumen de material existente y su fácil accesibilidad. El proceso de recolección es particularmente relevante porque a partir de esta etapa se desencadena todo el proceso de generación de inteligencia. Luego, en la fase de análisis, la materia prima recolectada se trata para generar información valiosa y comprensible. Los datos por sí solos no son útiles, por lo que hay que interpretarlos para obtener los primeros hechos derivados de un análisis en profundidad. Finalmente, en el proceso de extracción de conocimiento, la información previamente depurada se toma como insumo para algoritmos de inferencia más sofisticados.\n\n'
            +' • Requisitos: \n'
            +'¿Qué problema queremos resolver? ¿Qué informacion necesitamos?\n\n'
            +' • Identificación fuentes de información: \n'
            +'¿Que fuentes nos pueden aportar información valiosa y veraz?\n\n'
            +' • Adquisición:\n'
            +'Etapa de obtención de la información\n\n'
            +' • Procesamiento: \n'
            +'Dar formato a toda la información “en bruto” obtenida en la anterior fase\n\n'
            +' • Análisis: \n'
            +'Generar inteligencia a partir de todos los datos obtenidos, encontrando relaciones entre estos que nos permitan llegar a conclusiones.\n\n'
            +' • Presentación:\n\n'
            +'Darle a la información un formato en el que se pueda comprender de manera eficaz y sencilla.\n\n'
            +'\n El Big Data y aprendizaje automático en OSINT. \n\n'
            +'Los algoritmos de aprendizaje automático pueden automatizar y hacer que los procesos de investigación y toma de decisiones sean más inteligentes y eficientes. Permite detectar correlaciones complejas que son naturalmente impredecibles para los humanos. Este punto será clave en futuras actividades de OSINT, ya que marcará la diferencia entre la investigación impulsada por humanos y la impulsada por inteligencia artificial. Al incorporar esas técnicas, el proceso de recolección y análisis mejorará definitivamente, resultando así en investigaciones precisas y cercanas a nuestro objetivo. Además, las agencias gubernamentales de contrainteligencia pueden aprovechar ese paradigma para mejorar aún más la calidad de la información gestionada y, en consecuencia, la batalla contra las organizaciones terroristas.\n\n'
            +'\n Usos. \n\n'
            +'• Militar, Identificar y prevenir posibles amenazas en el ámbito militar o de la seguridad nacional.\n'
            +'• Policial: Buscar personas y hacerles un seguimiento.\n'
            +'• Financiero: evaluar tendencias de mercados, recopilar información con fines detectivescos, realizar análisis de mercado para lanzar campañas de marketing, obtener documentación para uso periodístico.\n'
            +'• Tecnológico: Conocer la reputación online de una empresa o de un usuario concreto, realizar estudios de tipo sociológico, psicológico o lingüístico, prevención de ciberataques, reconocimiento de un pentesting, hacer auditorías a empresas y organismos para evaluar su nivel de privacidad y seguridad.\n'
            +'\n Razones del OSINT. \n\n'
            +'En ciberseguridad y ciberdefensa los sistemas TIC están continuamente atacados por delincuentes con el objetivo de interrumpir la disponibilidad de los servicios prestados. Por lo tanto, la investigación se vuelve crucial para defender estos sistemas de los ciber atacantes, concretamente afrontando los desafíos que aún están abiertos en el campo de la ciberseguridad.\n\n'
            +'Las técnicas de minería de datos pueden ayudar a realizar análisis de los ataques diarios, correlacionarlos y apoyar los procesos de toma de decisiones para una defensa eficaz, pero también para una reacción rápida. Del mismo modo, OSINT también puede considerarse en este contexto como una fuente de información para rastreos e investigaciones. El análisis digital forense puede incorporar OSINT para complementar las evidencias digitales que deja un incidente.\n\n'
            +'Análisis de opinión y sentimiento social en las redes sociales, es posible recopilar Interacciones, mensajes, intereses y preferencias de los usuarios. extraer conocimiento no explícito. La evidencia acumulada en las redes sociales es de gran alcance y ampliamente ventajoso. Tal recopilación y análisis es aplicada al marketing, las campañas políticas o la gestión de desastres.\n\n'
            +'Cibercrimen y crimen organizado en ellos los datos abiertos son Analizado continuamente y comparado por procesos OSINT para detectar intenciones criminales en una etapa temprana. escenario. Teniendo en cuenta los patrones de los adversarios y las relaciones entre delitos graves se puede proporcionar fuerzas de seguridad la oportunidad de detectar rápidamente\n\n'
          },

    { id: '5', title: 'Ingeniería social', 
    content: 'No hay duda de que en esta era digital el mayor activo valioso sea la información todas las organizaciones lo saben además que esta información se comparte con otras en siendo una invasión a la privacidad para aquellos usuarios que navegan por internet. El gran peligro que corremos todos los que usamos redes de comunicación digitales es la “Ingeniería social” pero que es.\n\n'
            +'Descrito por Cristian B (2009). La Ingeniería Social puede definirse como una acción o conducta social destinada a conseguir información de las personas cercanas a un sistema. Es el arte de conseguir de un tercero aquellos datos de interés para el atacante por medio de habilidades sociales. Estas prácticas están relacionadas con la comunicación entre seres humanos. \n\n'
            +'Entonces con el planteamiento la persona que busca manipular sabe que el usuario es el eslabón más débil ya que ningún sistema se salva del control humano. A menudo se piensa de manera muy lógica en seguridad que la única computadora estará segura cuando este desenchufada, a lo que, la Ingeniería Social suelen responder que siempre habrá oportunidad de convencer a una persona de enchufarla. Por esto mismo muchos crackers se dedican a conseguir contraseñas de la manera fácil y si es preguntando la contraseña, esto les evita muchas horas de estar rompiendo una contraseña. \n\n'
            +'\n ¿Por qué se coopera? \n\n'
            +'A menudo el humano es tentado por el dar y ganar comúnmente el humano tiende a entregar algo a cambio después de otra cosa inicialmente, a manera de reciprocidad, dependiendo el caso y el escenario. Por ello la reacción del ser humano se es controlada si se le hace convence de manera acertada usando la urgencia o la presión. \n\n'
            +' Los ciberdelincuentes engañan, pero como es que lo hacen pues suelen hacer pasar por una entidad ya sea por familiares, personas de soporte técnico, ofrecer a la víctima premios o promociones únicas y limitadas a cambio de sus datos o por un producto o descuento, mediante compañeros de trabajo o personas de confianza. El objetivo de este engaño es apropiarse de datos personales, contraseñas o suplantar la identidad de la persona engañada.\n\n'
            +'\n Técnicas de ingeniería social. \n\n'
            +'Existen técnicas que se aprovechan de los usuarios y que podemos lograr observar para saber que estamos siendo víctimas de ingeniería social. \n\n'
            +' • Vishing: \n'
            +'A través de una llamada telefónica el ciberdelincuente se hace pasar por un familiar, personal de una empresa o de soporte técnico robando información.\n\n'
            +' • Phishing: \n'
            +'Envían correos electrónicos falsos para obtener información de la víctima. Solicitando datos personales, de tarjetas de crédito, de la obra social, de actualización laboral, contraseñas de sistemas, pueden ser crear situaciones hostiles para que el usuario haga las cosas sin razonar.\n\n'
            +' • Dispositivos maliciosos: \n'
            +'Dejan colocado un pendrive con contenido malicioso en una computadora pública y este dispositivo obtiene información de la persona que la utiliza. \n\n'
            +' • Concursos falsos: \n'
            +': Informan a la persona que ha ganado un premio para obtener información personal.\n\n'
            +' • Farming: \n'
            +'Realizan varias comunicaciones con las víctimas hasta conseguir la mayor cantidad de información posible. \n\n'
            +' • Robo de cuentas de correos electrónicos: \n'
            +'Roban cuentas reales para cometer ilícitos entre los contactos de la víctima, enviar software malicioso o para obtener información personal o se hacen pasar por soporte del correo.\n\n'
            +'\n Como mantener la guardia arriba \n\n'
            +'A menudo estos ataques son impredecibles, pero hay formas de defenderse de ellos como: nunca divulgar información sensible con desconocidos o en lugares públicos (como redes sociales, anuncios, páginas web, llamadas, etc.). Si se sospecha que alguien intenta realizar un engaño, hay que exigir se identifique y tratar de revertir la situación intentando obtener la mayor cantidad de información del sospechoso, configura la autenticación en dos pasos para estar alerta de accesos indebidos a tus cuentas.\n\n'
            +'\n\n'

          },
    { id: '6', title: 'FastAPI', 
    content: 'Content for Title 6 \n\n' 
            +'\n\n'
            +'\n\n'
            +'\n\n'
            +'\n\n'
            +'\n\n'
          },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => navigation.navigate('Detail', { title: item.title, content: item.content })}>
      <Text style={{ color: palette.text }}>- {item.title}</Text>
    </TouchableOpacity>
  );

  const colorScheme = useColorScheme();
  const palette = colorScheme === 'dark' ? darkColors : lightColors;
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: palette.primary,
      width: '100%',
    },
    content: {
      width: '85%',
      alignSelf: 'center',
      
    },
    item: {
      padding: 10,
      marginVertical: 8,
      backgroundColor: palette.primary,
      font: palette.primary,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content} showsVerticalScrollIndicator={false}>
        <Title palette={palette} text="Academy"/>
        <Subtitle palette={palette} text="Index: "/>
        <View>
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </View>
      </SafeAreaView>
    </View>
  );
};

