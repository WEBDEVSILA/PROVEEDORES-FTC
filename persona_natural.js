

var fechaNacimiento = document.getElementById("fechaNacim");
var form = document.getElementById("form-id");
var principal = document.getElementById("principal");
var secundaria = document.getElementById("secundaria");
var otra = document.getElementById("actividadOtra");
var codCiiu = new Map();
var authSi = document.getElementById("si");
var authNo = document.getElementById("no");
var factSi = document.getElementById("factSi");
var primerNombre = document.getElementById("primerNombre");
var segundoNombre = document.getElementById("segundoNombre");
var primerApellido = document.getElementById("primerApellido");
var segundoApellido = document.getElementById("segundoApellido");
var nit = document.getElementById("nit");
var idTitular = document.getElementById("idTitular");
var titular = document.getElementById("titular");

fill();
validateAuth();
validateInfoEmpresa();


document.getElementById("fechaNacim").addEventListener("change",function(){
    var res = calcularEdad(fechaNacimiento.value);
    console.log(res);
    document.getElementById("edad").value=res;
});

document.getElementById("save").addEventListener("click",function(){
    console.log("Save");
    document.getElementById("enviar").value="save";
    document.getElementsByClassName("form-control").required=false;
    form.submit();
});

document.getElementById("logOut").addEventListener("click",function(){
    console.log("Log Out");
    document.getElementById("form-logOut").submit();
});

document.getElementById("clear").addEventListener("click", function(){
    document.getElementById("alerta").style.display="none";
});


function concatName(){   
    if(primerNombre.value == "NA"){
        primerNombre.value = "";
    }
    if(segundoNombre.value == "NA"){
        segundoNombre.value = "";
    }
    if(primerApellido.value == "NA"){
        primerApellido.value = "";
    }
    if(segundoApellido.value == "NA"){
        segundoApellido.value = "";
    } 
    titular.value = primerNombre.value + " " +segundoNombre.value + " " + primerApellido.value;
    
}

function upperCase(element){    
    element.value = element.value.toString().toUpperCase();

    primerNombre.value = primerNombre.value.split("-").join(" ");
    segundoNombre.value = segundoNombre.value.split("-").join(" ");
    primerApellido.value = primerApellido.value.split("-").join(" ");
    segundoApellido.value = segundoApellido.value.split("-").join(" ");
    primerNombre.value = primerNombre.value.split(".").join("");
    segundoNombre.value = segundoNombre.value.split(".").join("");
    primerApellido.value = primerApellido.value.split(".").join("");
    segundoApellido.value = segundoApellido.value.split(".").join("");
    primerNombre.value = primerNombre.value.split("/").join("");
    segundoNombre.value = segundoNombre.value.split("/").join("");
    primerApellido.value = primerApellido.value.split("/").join("");
    segundoApellido.value = segundoApellido.value.split("/").join("");

  

    
}

function validateInfoEmpresa(){
    if(factSi.checked){
        document.getElementById("infoEmpresa").style.display = "block";
        document.getElementById("headEmpresa").style.borderBottomLeftRadius = "0px";
        document.getElementById("headEmpresa").style.borderBottomRightRadius = "0px";
    }else{
        document.getElementById("infoEmpresa").style.display = "none";
        document.getElementById("headEmpresa").style.borderBottomLeftRadius = "10px";
        document.getElementById("headEmpresa").style.borderBottomRightRadius = "10px";
    }
}

function validateCIIU(element,ciiu){
    if(element.value != ""){
        var description = codCiiu.get(element.value.toString());
        console.log(description);
        if(description != undefined){
            document.getElementById(ciiu).value=description;            
        }else{
            document.getElementById(ciiu).value=""; 
            alert("Parece que el código CIIU ingresado no existe, intente de nuevo por favor");
        }
    }else{
        document.getElementById(ciiu).value="";                
    }    
}
function validateErase(element,ciiu){
    if(element.value == ""){
        document.getElementById(ciiu).value="";     
    }
}
function validateArrowKey(e){
    var n = (window.Event) ? e.which : e.keyCode;
    if (n==38 || n==40){        
        return false;
    } 
}  
function validateAuth(){
    if(authSi.checked){
        document.getElementById("submitButton").disabled=false;
    }else{
        document.getElementById("submitButton").disabled=true;
    }
}

function calcularEdad(fecha) {
    console.log(fecha);
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

function ValidateSingleInput(oInput,...files) {
    var _validFileExtensions = files;  
    
    if (oInput.type == "file") {
        var sFileName = oInput.value;
         if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
             
            if (!blnValid) {
                alert("Formato incorrecto, las extensiones permitidas son: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    var fileSize = oInput.files[0].size/1000;
    if(fileSize > 5000){
        alert("El archivo excede el peso máximo");
        oInput.value = "";
        return false;
    }

    return true;
}

function fill(){

    codCiiu.set('A','AGRICULTURA, GANADERIA, CAZA Y SILVICULTURA (DIVISION 01 Y 02)');

    codCiiu.set('SE','AGRICULTURA, GANADERÍA, CAZA, SILVICULTURA Y PESCA');

    codCiiu.set('01','Agricultura, ganadería, caza y actividades de servicios conexas ');

    codCiiu.set('011','Cultivos agrícolas transitorios ');

    codCiiu.set('0111','Cultivo de cereales (excepto arroz), legumbres y semillas oleaginosas ');

    codCiiu.set('0112','Cultivo de arroz ');

    codCiiu.set('0113','Cultivo de hortalizas, raíces y tubérculos ');

    codCiiu.set('0114','Cultivo de tabaco ');

    codCiiu.set('0115','Cultivo de plantas textiles ');

    codCiiu.set('0119','Otros cultivos transitorios n.c.p.');

    codCiiu.set('012','Cultivos agrícolas permanentes ');

    codCiiu.set('0121','Cultivo de frutas tropicales y subtropicales');

    codCiiu.set('0122','Cultivo de plátano y banano');

    codCiiu.set('0123','Cultivo de café');

    codCiiu.set('0124','Cultivo de caña de azúcar');

    codCiiu.set('0125','Cultivo de flor de corte');

    codCiiu.set('0126','Cultivo de palma para aceite (palma africana) y otros frutos oleaginosos');

    codCiiu.set('0127','Cultivo de plantas con las que se preparan bebidas');

    codCiiu.set('0128','Cultivo de especias y de plantas aromáticas y medicinales ');

    codCiiu.set('0129','Otros cultivos permanentes n.c.p.');

    codCiiu.set('013','Propagación de plantas (actividades de los viveros, excepto viveros forestales) ');

    codCiiu.set('014','Ganadería ');

    codCiiu.set('0141','Cría de ganado bovino y bufalino');

    codCiiu.set('0142','Cría de caballos y otros equinos ');

    codCiiu.set('0143','Cría de ovejas y cabras ');

    codCiiu.set('0144','Cría de ganado porcino');

    codCiiu.set('0145','Cría de aves de corral');

    codCiiu.set('0149','Cría de otros animales n.c.p.');

    codCiiu.set('015','Explotación mixta (agrícola y pecuaria) ');

    codCiiu.set('016','Actividades de apoyo a la agricultura y la ganadería, y actividades posteriores ');

    codCiiu.set('0161','Actividades de apoyo a la agricultura ');

    codCiiu.set('0162','Actividades de apoyo a la ganadería');

    codCiiu.set('0163','Actividades posteriores a la cosecha ');

    codCiiu.set('0164','Tratamiento de semillas para propagación ');

    codCiiu.set('017','Caza ordinaria y mediante trampas y actividades de servicios conexas ');

    codCiiu.set('02','Silvicultura y extracción de madera');

    codCiiu.set('021','Silvicultura y otras actividades forestales');

    codCiiu.set('022','Extracción de madera ');

    codCiiu.set('023','Recolección de productos forestales diferentes a la madera');

    codCiiu.set('024','Servicios de apoyo a la silvicultura ');

    codCiiu.set('03','Pesca y acuicultura');

    codCiiu.set('031','Pesca ');

    codCiiu.set('0311','Pesca marítima ');

    codCiiu.set('0312','Pesca de agua dulce ');

    codCiiu.set('032','Acuicultura ');

    codCiiu.set('0321','Acuicultura marítima ');

    codCiiu.set('0322','Acuicultura de agua dulce');

    codCiiu.set('SE','EXPLOTACIÓN DE MINAS Y CANTERAS');

    codCiiu.set('05','Extracción de carbón de piedra y lignito');

    codCiiu.set('051','Extracción de hulla (carbón de piedra)');

    codCiiu.set('052','Extracción de carbón lignito');

    codCiiu.set('06','Extracción de petróleo crudo y gas natural');

    codCiiu.set('061','Extracción de petróleo crudo');

    codCiiu.set('062','Extracción de gas natural');

    codCiiu.set('07','Extracción de minerales metalíferos');

    codCiiu.set('071','Extracción de minerales de hierro');

    codCiiu.set('072','Extracción de minerales metalíferos no ferrosos');

    codCiiu.set('0721','Extracción de minerales de uranio y de torio');

    codCiiu.set('0722','Extracción de oro y otros metales preciosos');

    codCiiu.set('0723','Extracción de minerales de níquel');

    codCiiu.set('0729','Extracción de otros minerales metalíferos no ferrosos n.c.p.');

    codCiiu.set('08','Extracción de otras minas y canteras');

    codCiiu.set('081','Extracción de piedra, arena, arcillas, cal, yeso, caolín, bentonitas y similares');

    codCiiu.set('0811','Extracción de piedra, arena, arcillas comunes, yeso y anhidrita');

    codCiiu.set('0812','Extracción de arcillas de uso industrial, caliza, caolín y bentonitas');

    codCiiu.set('082','Extracción de esmeraldas, piedras preciosas y semipreciosas');

    codCiiu.set('089','Extracción de otros minerales no metálicos n.c.p.');

    codCiiu.set('0891','Extracción de minerales para la fabricación de abonos y productos químicos');

    codCiiu.set('0892','Extracción de halita (sal)');

    codCiiu.set('0899','Extracción de otros minerales no metálicos n.c.p.');

    codCiiu.set('09','Actividades de servicios de apoyo para la explotación de minas ');

    codCiiu.set('091','Actividades de apoyo para la extracción de petróleo y de gas natural');

    codCiiu.set('099','Actividades de apoyo para otras actividades de explotación de minas y canteras');

    codCiiu.set('SE','INDUSTRIAS MANUFACTURERAS');

    codCiiu.set('10','Elaboración de productos alimenticios');

    codCiiu.set('101','Procesamiento y conservación de carne, pescado, crustáceos y moluscos ');

    codCiiu.set('1011','Procesamiento y conservación de carne y productos cárnicos');

    codCiiu.set('1012','Procesamiento y conservación de pescados, crustáceos y moluscos');

    codCiiu.set('102','Procesamiento y conservación de frutas, legumbres, hortalizas y tubérculos');

    codCiiu.set('103','Elaboración de aceites y grasas de origen vegetal y animal');

    codCiiu.set('104','Elaboración de productos lácteos');

    codCiiu.set('105','Elaboración de productos de molinería, almidones y productos derivados del almid');

    codCiiu.set('1051','Elaboración de productos de molinería');

    codCiiu.set('1052','Elaboración de almidones y productos derivados del almidón');

    codCiiu.set('106','Elaboración de productos de café');

    codCiiu.set('1061','Trilla de café');

    codCiiu.set('1062','Descafeinado, tostión y molienda del café');

    codCiiu.set('1063','Otros derivados del café');

    codCiiu.set('107','Elaboración de azúcar y panela');

    codCiiu.set('1071','Elaboración y refinación de azúcar');

    codCiiu.set('1072','Elaboración de panela');

    codCiiu.set('108','Elaboración de otros productos alimenticios');

    codCiiu.set('1081','Elaboración de productos de panadería');

    codCiiu.set('1082','Elaboración de cacao, chocolate y productos de confitería');

    codCiiu.set('1083','Elaboración de macarrones, fideos, alcuzcuz y productos farináceos similares');

    codCiiu.set('1084','Elaboración de comidas y platos preparados');

    codCiiu.set('1089','Elaboración de otros productos alimenticios n.c.p.');

    codCiiu.set('109','Elaboración de alimentos preparados para animales');

    codCiiu.set('11','Elaboración de bebidas');

    codCiiu.set('110','Elaboración de bebidas');

    codCiiu.set('1101','Destilación, rectificación y mezcla de bebidas alcohólicas');

    codCiiu.set('1102','Elaboración de bebidas fermentadas no destiladas');

    codCiiu.set('1103','Producción de malta, elaboración de cervezas y otras bebidas malteadas');

    codCiiu.set('1104','Elaboración de bebidas no alcohólicas, producción de aguas minerales y de otras ');

    codCiiu.set('12','Elaboración de productos de tabaco');

    codCiiu.set('120','Elaboración de productos de tabaco');

    codCiiu.set('13','Fabricación de productos textiles');

    codCiiu.set('131','Preparación, hilatura, tejeduría y acabado de productos textiles');

    codCiiu.set('1311','Preparación e hilatura de fibras textiles');

    codCiiu.set('1312','Tejeduría de productos textiles');

    codCiiu.set('1313','Acabado de productos textiles');

    codCiiu.set('139','Fabricación de otros productos textiles');

    codCiiu.set('1391','Fabricación de tejidos de punto y ganchillo');

    codCiiu.set('1392','Confección de artículos con materiales textiles, excepto prendas de vestir');

    codCiiu.set('1393','Fabricación de tapetes y alfombras para pisos');

    codCiiu.set('1394','Fabricación de cuerdas, cordeles, cables, bramantes y redes');

    codCiiu.set('1399','Fabricación de otros artículos textiles n.c.p.');

    codCiiu.set('14','Confección de prendas de vestir');

    codCiiu.set('141','Confección de prendas de vestir, excepto prendas de piel');

    codCiiu.set('142','Fabricación de artículos de piel');

    codCiiu.set('143','Fabricación de artículos de punto y ganchillo');

    codCiiu.set('15','"Curtido y recurtido de cueros; fabricación de calzado; fabricación de artículos');

    codCiiu.set('151','"Curtido y recurtido de cueros; fabricación de artículos de viaje, bolsos de man');

    codCiiu.set('1511','"Curtido y recurtido de cueros; recurtido y teñido de pieles"');

    codCiiu.set('1512','Fabricación de artículos de viaje, bolsos de mano y artículos similares elaborad');

    codCiiu.set('1513','"Fabricación de artículos de viaje, bolsos de mano y artículos similares; artícu');

    codCiiu.set('152','Fabricación de calzado');

    codCiiu.set('1521','Fabricación de calzado de cuero y piel, con cualquier tipo de suela');

    codCiiu.set('1522','Fabricación de otros tipos de calzado, excepto calzado de cuero y piel');

    codCiiu.set('1523','Fabricación de partes del calzado');

    codCiiu.set('16','"Transformación de la madera y fabricación de productos de madera y de corcho, e');

    codCiiu.set('161','Aserrado, acepillado e impregnación de la madera');

    codCiiu.set('162','"Fabricación de hojas de madera para enchapado; fabricación de tableros contrach');

    codCiiu.set('163','Fabricación de partes y piezas de madera, de carpintería y ebanistería para la c');

    codCiiu.set('164','Fabricación de recipientes de madera');

    codCiiu.set('169','"Fabricación de otros productos de madera; fabricación de artículos de corcho, c');

    codCiiu.set('17','Fabricación de papel, cartón y productos de papel y cartón');

    codCiiu.set('170','Fabricación de papel, cartón y productos de papel y cartón');

    codCiiu.set('1701','"Fabricación de pulpas (pastas) celulósicas; papel y cartón"');

    codCiiu.set('1702','"Fabricación de papel y cartón ondulado (corrugado); fabricación de envases, emp');

    codCiiu.set('1709','Fabricación de otros artículos de papel y cartón');

    codCiiu.set('18','Actividades de impresión y de producción de copias a partir de grabaciones origi');

    codCiiu.set('181','Actividades de impresión y actividades de servicios relacionados con la impresió');

    codCiiu.set('1811','Actividades de impresión');

    codCiiu.set('1812','Actividades de servicios relacionados con la impresión');

    codCiiu.set('182','Producción de copias a partir de grabaciones originales ');

    codCiiu.set('19','Coquización, fabricación de productos de la refinación del petróleo y actividad ');

    codCiiu.set('191','Fabricación de productos de hornos de coque');

    codCiiu.set('192','Fabricación de productos de la refinación del petróleo');

    codCiiu.set('1921','Fabricación de productos de la refinación del petróleo');

    codCiiu.set('1922','Actividad de mezcla de combustibles');

    codCiiu.set('20','Fabricación de sustancias y productos químicos');

    codCiiu.set('201','Fabricación de sustancias químicas básicas, abonos y compuestos inorgánicos nitr');

    codCiiu.set('2011','Fabricación de sustancias y productos químicos básicos');

    codCiiu.set('2012','Fabricación de abonos y compuestos inorgánicos nitrogenados');

    codCiiu.set('2013','Fabricación de plásticos en formas primarias');

    codCiiu.set('2014','Fabricación de caucho sintético en formas primarias');

    codCiiu.set('202','Fabricación de otros productos químicos');

    codCiiu.set('2021','Fabricación de plaguicidas y otros productos químicos de uso agropecuario');

    codCiiu.set('2022','Fabricación de pinturas, barnices y revestimientos similares, tintas para impres');

    codCiiu.set('2023','"Fabricación de jabones y detergentes, preparados para limpiar y pulir; perfumes');

    codCiiu.set('2029','Fabricación de otros productos químicos n.c.p.');

    codCiiu.set('203','Fabricación de fibras sintéticas y artificiales');

    codCiiu.set('21','Fabricación de productos farmacéuticos, sustancias químicas medicinales y produc');

    codCiiu.set('210','Fabricación de productos farmacéuticos, sustancias químicas medicinales y produc');

    codCiiu.set('22','Fabricación de productos de caucho y de plástico');

    codCiiu.set('221','Fabricación de productos de caucho');

    codCiiu.set('2211','Fabricación de llantas y neumáticos de caucho');

    codCiiu.set('2212','Reencauche de llantas usadas');

    codCiiu.set('2219','Fabricación de formas básicas de caucho y otros productos de caucho n.c.p.');

    codCiiu.set('222','Fabricación de productos de plástico');

    codCiiu.set('2221','Fabricación de formas básicas de plástico');

    codCiiu.set('2229','Fabricación de artículos de plástico n.c.p.');

    codCiiu.set('23','Fabricación de otros productos minerales no metálicos');

    codCiiu.set('231','Fabricación de vidrio y productos de vidrio');

    codCiiu.set('239','Fabricación de productos minerales no metálicos n.c.p.');

    codCiiu.set('2391','Fabricación de productos refractarios');

    codCiiu.set('2392','Fabricación de materiales de arcilla para la construcción');

    codCiiu.set('2393','Fabricación de otros productos de cerámica y porcelana');

    codCiiu.set('2394','Fabricación de cemento, cal y yeso');

    codCiiu.set('2395','Fabricación de artículos de hormigón, cemento y yeso');

    codCiiu.set('2396','Corte, tallado y acabado de la piedra');

    codCiiu.set('2399','Fabricación de otros productos minerales no metálicos n.c.p.');

    codCiiu.set('24','Fabricación de productos metalúrgicos básicos');

    codCiiu.set('241','Industrias básicas de hierro y de acero');

    codCiiu.set('242','Industrias básicas de metales preciosos y de metales no ferrosos');

    codCiiu.set('2421','Industrias básicas de metales preciosos');

    codCiiu.set('2429','Industrias básicas de otros metales no ferrosos');

    codCiiu.set('243','Fundición de metales');

    codCiiu.set('2431','Fundición de hierro y de acero');

    codCiiu.set('2432','Fundición de metales no ferrosos ');

    codCiiu.set('25','Fabricación de productos elaborados de metal, excepto maquinaria y equipo');

    codCiiu.set('251','Fabricación de productos metálicos para uso estructural, tanques, depósitos y ge');

    codCiiu.set('2511','Fabricación de productos metálicos para uso estructural');

    codCiiu.set('2512','Fabricación de tanques, depósitos y recipientes de metal, excepto los utilizados');

    codCiiu.set('2513','Fabricación de generadores de vapor, excepto calderas de agua caliente para cale');

    codCiiu.set('252','Fabricación de armas y municiones');

    codCiiu.set('259','Fabricación de otros productos elaborados de metal y actividades de servicios re');

    codCiiu.set('2591','"Forja, prensado, estampado y laminado de metal; pulvimetalurgia"');

    codCiiu.set('2592','"Tratamiento y revestimiento de metales; mecanizado"');

    codCiiu.set('2593','Fabricación de artículos de cuchillería, herramientas de mano y artículos de fer');

    codCiiu.set('2599','Fabricación de otros productos elaborados de metal n.c.p.');

    codCiiu.set('26','Fabricación de productos informáticos, electrónicos y ópticos');

    codCiiu.set('261','Fabricación de componentes y tableros electrónicos');

    codCiiu.set('262','Fabricación de computadoras y de equipo periférico');

    codCiiu.set('263','Fabricación de equipos de comunicación');

    codCiiu.set('264','Fabricación de aparatos electrónicos de consumo');

    codCiiu.set('265','"Fabricación de equipo de medición, prueba, navegación y control; fabricación de');

    codCiiu.set('2651','Fabricación de equipo de medición, prueba, navegación y control');

    codCiiu.set('2652','Fabricación de relojes');

    codCiiu.set('266','Fabricación de equipo de irradiación y equipo electrónico de uso médico y terapé');

    codCiiu.set('267','Fabricación de instrumentos ópticos y equipo fotográfico');

    codCiiu.set('268','Fabricación de medios magnéticos y ópticos para almacenamiento de datos');

    codCiiu.set('27','Fabricación de aparatos y equipo eléctrico');

    codCiiu.set('271','Fabricación de motores, generadores y transformadores eléctricos y de aparatos d');

    codCiiu.set('2711','Fabricación de motores, generadores y transformadores eléctricos');

    codCiiu.set('2712','Fabricación de aparatos de distribución y control de la energía eléctrica');

    codCiiu.set('272','Fabricación de pilas, baterías y acumuladores eléctricos');

    codCiiu.set('273','Fabricación de hilos y cables aislados y sus dispositivos');

    codCiiu.set('2731','Fabricación de hilos y cables eléctricos y de fibra óptica');

    codCiiu.set('2732','Fabricación de dispositivos de cableado');

    codCiiu.set('274','Fabricación de equipos eléctricos de iluminación');

    codCiiu.set('275','Fabricación de aparatos de uso doméstico');

    codCiiu.set('279','Fabricación de otros tipos de equipo eléctrico n.c.p.');

    codCiiu.set('28','Fabricación de maquinaria y equipo n.c.p.');

    codCiiu.set('281','Fabricación de maquinaria y equipo de uso general');

    codCiiu.set('2811','Fabricación de motores, turbinas, y partes para motores de combustión interna');

    codCiiu.set('2812','Fabricación de equipos de potencia hidráulica y neumática');

    codCiiu.set('2813','Fabricación de otras bombas, compresores, grifos y válvulas');

    codCiiu.set('2814','Fabricación de cojinetes, engranajes, trenes de engranajes y piezas de transmisi');

    codCiiu.set('2815','Fabricación de hornos, hogares y quemadores industriales');

    codCiiu.set('2816','Fabricación de equipo de elevación y manipulación');

    codCiiu.set('2817','Fabricación de maquinaria y equipo de oficina (excepto computadoras y equipo per');

    codCiiu.set('2818','Fabricación de herramientas manuales con motor');

    codCiiu.set('2819','Fabricación de otros tipos de maquinaria y equipo de uso general n.c.p.');

    codCiiu.set('282','Fabricación de maquinaria y equipo de uso especial');

    codCiiu.set('2821','Fabricación de maquinaria agropecuaria y forestal');

    codCiiu.set('2822','Fabricación de máquinas formadoras de metal y de máquinas herramienta');

    codCiiu.set('2823','Fabricación de maquinaria para la metalurgia');

    codCiiu.set('2824','Fabricación de maquinaria para explotación de minas y canteras y para obras de c');

    codCiiu.set('2825','Fabricación de maquinaria para la elaboración de alimentos, bebidas y tabaco');

    codCiiu.set('2826','Fabricación de maquinaria para la elaboración de productos textiles, prendas de ');

    codCiiu.set('2829','Fabricación de otros tipos de maquinaria y equipo de uso especial n.c.p.');

    codCiiu.set('29','Fabricación de vehículos automotores, remolques y semirremolques');

    codCiiu.set('291','Fabricación de vehículos automotores y sus motores');

    codCiiu.set('292','"Fabricación de carrocerías para vehículos automotores; fabricación de remolques');

    codCiiu.set('293','Fabricación de partes, piezas (autopartes) y accesorios (lujos) para vehículos a');

    codCiiu.set('30','Fabricación de otros tipos de equipo de transporte');

    codCiiu.set('301','Construcción de barcos y otras embarcaciones');

    codCiiu.set('3011','Construcción de barcos y de estructuras flotantes');

    codCiiu.set('3012','Construcción de embarcaciones de recreo y deporte');

    codCiiu.set('302','Fabricación de locomotoras y de material rodante para ferrocarriles');

    codCiiu.set('303','Fabricación de aeronaves, naves espaciales y de maquinaria conexa');

    codCiiu.set('304','Fabricación de vehículos militares de combate');

    codCiiu.set('309','Fabricación de otros tipos de equipo de transporte n.c.p.');

    codCiiu.set('3091','Fabricación de motocicletas');

    codCiiu.set('3092','Fabricación de bicicletas y de sillas de ruedas para personas con discapacidad');

    codCiiu.set('3099','Fabricación de otros tipos de equipo de transporte n.c.p.');

    codCiiu.set('31','Fabricación de muebles, colchones y somieres');

    codCiiu.set('311','Fabricación de muebles ');

    codCiiu.set('312','Fabricación de colchones y somieres');

    codCiiu.set('32','Otras industrias manufactureras');

    codCiiu.set('321','Fabricación de joyas, bisutería y artículos conexos');

    codCiiu.set('322','Fabricación de instrumentos musicales');

    codCiiu.set('323','Fabricación de artículos y equipo para la práctica del deporte');

    codCiiu.set('324','Fabricación de juegos, juguetes y rompecabezas');

    codCiiu.set('325','Fabricación de instrumentos, aparatos y materiales médicos y odontológicos (incl');

    codCiiu.set('329','Otras industrias manufactureras n.c.p.');

    codCiiu.set('33','Instalación, mantenimiento y reparación especializado de maquinaria y equipo');

    codCiiu.set('331','Mantenimiento y reparación especializado de productos elaborados en metal y de m');

    codCiiu.set('3311','Mantenimiento y reparación especializado de productos elaborados en metal');

    codCiiu.set('3312','Mantenimiento y reparación especializado de maquinaria y equipo');

    codCiiu.set('3313','Mantenimiento y reparación especializado de equipo electrónico y óptico');

    codCiiu.set('3314','Mantenimiento y reparación especializado de equipo eléctrico');

    codCiiu.set('3315','Mantenimiento y reparación especializado de equipo de transporte, excepto los ve');

    codCiiu.set('3319','Mantenimiento y reparación de otros tipos de equipos y sus componentes n.c.p.');

    codCiiu.set('332','Instalación especializada de maquinaria y equipo industrial ');

    codCiiu.set('SE','SUMINISTRO DE ELECTRICIDAD, GAS, VAPOR Y AIRE ACONDICIONADO');

    codCiiu.set('35','Suministro de electricidad, gas, vapor y aire acondicionado ');

    codCiiu.set('351','Generación, transmisión, distribución y comercialización de energía eléctrica');

    codCiiu.set('3511','Generación de energía eléctrica');

    codCiiu.set('3512','Transmisión de energía eléctrica');

    codCiiu.set('3513','Distribución de energía eléctrica');

    codCiiu.set('3514','Comercialización de energía eléctrica');

    codCiiu.set('352','"Producción de gas; distribución de combustibles gaseosos por tuberías"');

    codCiiu.set('353','Suministro de vapor y aire acondicionado');

    codCiiu.set('SE','"DISTRIBUCIÓN DE AGUA; EVACUACIÓN Y TRATAMIENTO DE AGUAS RESIDUALES, GESTIÓN DE ');

    codCiiu.set('36','Captación, tratamiento y distribución de agua');

    codCiiu.set('360','Captación, tratamiento y distribución de agua');

    codCiiu.set('37','Evacuación y tratamiento de aguas residuales');

    codCiiu.set('370','Evacuación y tratamiento de aguas residuales');

    codCiiu.set('38','Recolección, tratamiento y disposición de desechos, recuperación de materiales');

    codCiiu.set('381','Recolección de desechos');

    codCiiu.set('3811','Recolección de desechos no peligrosos');

    codCiiu.set('3812','Recolección de desechos peligrosos');

    codCiiu.set('382','Tratamiento y disposición de desechos');

    codCiiu.set('3821','Tratamiento y disposición de desechos no peligrosos');

    codCiiu.set('3822','Tratamiento y disposición de desechos peligrosos');

    codCiiu.set('383','Recuperación de materiales');

    codCiiu.set('39','Actividades de saneamiento ambiental y otros servicios de gestión de desechos');

    codCiiu.set('390','Actividades de saneamiento ambiental y otros servicios de gestión de desechos');

    codCiiu.set('SE','CONSTRUCCIÓN');

    codCiiu.set('41','Construcción de edificios');

    codCiiu.set('411','Construcción de edificios');

    codCiiu.set('4111','Construcción de edificios residenciales');

    codCiiu.set('4112','Construcción de edificios no residenciales');

    codCiiu.set('42','Obras de ingeniería civil');

    codCiiu.set('421','Construcción de carreteras y vías de ferrocarril');

    codCiiu.set('422','Construcción de proyectos de servicio público');

    codCiiu.set('429','Construcción de otras obras de ingeniería civil');

    codCiiu.set('43','Actividades especializadas para la construcción de edificios y obras de ingenier');

    codCiiu.set('431','Demolición y preparación del terreno');

    codCiiu.set('4311','Demolición');

    codCiiu.set('4312','Preparación del terreno');

    codCiiu.set('432','Instalaciones eléctricas, de fontanería y otras instalaciones especializadas');

    codCiiu.set('4321','Instalaciones eléctricas');

    codCiiu.set('4322','Instalaciones de fontanería, calefacción y aire acondicionado');

    codCiiu.set('4329','Otras instalaciones especializadas');

    codCiiu.set('433','Terminación y acabado de edificios y obras de ingeniería civil');

    codCiiu.set('439','Otras actividades especializadas para la construcción de edificios y obras de in');

    codCiiu.set('SE','"COMERCIO AL POR MAYOR Y AL POR MENOR; REPARACIÓN DE VEHÍCULOS AUTOMOTORES Y MOT');

    codCiiu.set('45','Comercio, mantenimiento y reparación de vehículos automotores y motocicletas, su');

    codCiiu.set('451','Comercio de vehículos automotores');

    codCiiu.set('4511','Comercio de vehículos automotores nuevos');

    codCiiu.set('4512','Comercio de vehículos automotores usados');

    codCiiu.set('452','Mantenimiento y reparación de vehículos automotores');

    codCiiu.set('453','Comercio de partes, piezas (autopartes) y accesorios (lujos) para vehículos auto');

    codCiiu.set('454','Comercio, mantenimiento y reparación de motocicletas y de sus partes, piezas y a');

    codCiiu.set('4541','Comercio de motocicletas y de sus partes, piezas y accesorios');

    codCiiu.set('4542','Mantenimiento y reparación de motocicletas y de sus partes y piezas');

    codCiiu.set('46','Comercio al por mayor y en comisión o por contrata, excepto el comercio de vehíc');

    codCiiu.set('461','Comercio al por mayor a cambio de una retribución o por contrata');

    codCiiu.set('462','"Comercio al por mayor de materias primas agropecuarias; animales vivos"');

    codCiiu.set('463','Comercio al por mayor de alimentos, bebidas y tabaco');

    codCiiu.set('4631','Comercio al por mayor de productos alimenticios');

    codCiiu.set('4632','Comercio al por mayor de bebidas y tabaco');

    codCiiu.set('464','Comercio al por mayor de artículos y enseres domésticos (incluidas prendas de ve');

    codCiiu.set('4641','Comercio al por mayor de productos textiles, productos confeccionados para uso d');

    codCiiu.set('4642','Comercio al por mayor de prendas de vestir');

    codCiiu.set('4643','Comercio al por mayor de calzado');

    codCiiu.set('4644','Comercio al por mayor de aparatos y equipo de uso doméstico');

    codCiiu.set('4645','Comercio al por mayor de productos farmacéuticos, medicinales, cosméticos y de t');

    codCiiu.set('4649','Comercio al por mayor de otros utensilios domésticos n.c.p.');

    codCiiu.set('465','Comercio al por mayor de maquinaria y equipo ');

    codCiiu.set('4651','Comercio al por mayor de computadores, equipo periférico y programas de informát');

    codCiiu.set('4652','Comercio al por mayor de equipo, partes y piezas electrónicos y de telecomunicac');

    codCiiu.set('4653','Comercio al por mayor de maquinaria y equipo agropecuarios');

    codCiiu.set('4659','Comercio al por mayor de otros tipos de maquinaria y equipo n.c.p.');

    codCiiu.set('466','Comercio al por mayor especializado de otros productos');

    codCiiu.set('4661','Comercio al por mayor de combustibles sólidos, líquidos, gaseosos y productos co');

    codCiiu.set('4662','Comercio al por mayor de metales y productos metalíferos');

    codCiiu.set('4663','Comercio al por mayor de materiales de construcción, artículos de ferretería, pi');

    codCiiu.set('4664','Comercio al por mayor de productos químicos básicos, cauchos y plásticos en form');

    codCiiu.set('4665','Comercio al por mayor de desperdicios, desechos y chatarra');

    codCiiu.set('4669','Comercio al por mayor de otros productos n.c.p.');

    codCiiu.set('469','Comercio al por mayor no especializado');

    codCiiu.set('47','Comercio al por menor (incluso el comercio al por menor de combustibles), except');

    codCiiu.set('471','Comercio al por menor en establecimientos no especializados');

    codCiiu.set('4711','Comercio al por menor en establecimientos no especializados con surtido compuest');

    codCiiu.set('4719','Comercio al por menor en establecimientos no especializados, con surtido compues');

    codCiiu.set('472','Comercio al por menor de alimentos (víveres en general), bebidas y tabaco, en es');

    codCiiu.set('4721','Comercio al por menor de productos agrícolas para el consumo en establecimientos');

    codCiiu.set('4722','Comercio al por menor de leche, productos lácteos y huevos, en establecimientos ');

    codCiiu.set('4723','Comercio al por menor de carnes (incluye aves de corral), productos cárnicos, pe');

    codCiiu.set('4724','Comercio al por menor de bebidas y productos del tabaco, en establecimientos esp');

    codCiiu.set('4729','Comercio al por menor de otros productos alimenticios n.c.p., en establecimiento');

    codCiiu.set('473','Comercio al por menor de combustible, lubricantes, aditivos y productos de limpi');

    codCiiu.set('4731','Comercio al por menor de combustible para automotores');

    codCiiu.set('4732','Comercio al por menor de lubricantes (aceites, grasas), aditivos y productos de ');

    codCiiu.set('474','Comercio al por menor de equipos de informática y de comunicaciones, en establec');

    codCiiu.set('4741','Comercio al por menor de computadores, equipos periféricos, programas de informá');

    codCiiu.set('4742','Comercio al por menor de equipos y aparatos de sonido y de video, en establecimi');

    codCiiu.set('475','Comercio al por menor de otros enseres domésticos en establecimientos especializ');

    codCiiu.set('4751','Comercio al por menor de productos textiles en establecimientos especializados');

    codCiiu.set('4752','Comercio al por menor de artículos de ferretería, pinturas y productos de vidrio');

    codCiiu.set('4753','Comercio al por menor de tapices, alfombras y cubrimientos para paredes y pisos ');

    codCiiu.set('4754','Comercio al por menor de electrodomésticos y gasodomésticos de uso doméstico, mu');

    codCiiu.set('4755','Comercio al por menor de artículos y utensilios de uso doméstico');

    codCiiu.set('4759','Comercio al por menor de otros artículos domésticos en establecimientos especial');

    codCiiu.set('476','Comercio al por menor de artículos culturales y de entretenimiento, en estableci');

    codCiiu.set('4761','Comercio al por menor de libros, periódicos, materiales y artículos de papelería');

    codCiiu.set('4762','Comercio al por menor de artículos deportivos, en establecimientos especializado');

    codCiiu.set('4769','Comercio al por menor de otros artículos culturales y de entretenimiento n.c.p. ');

    codCiiu.set('477','Comercio al por menor de otros productos en establecimientos especializados');

    codCiiu.set('4771','Comercio al por menor de prendas de vestir y sus accesorios (incluye artículos d');

    codCiiu.set('4772','Comercio al por menor de todo tipo de calzado y artículos de cuero y sucedáneos ');

    codCiiu.set('4773','Comercio al por menor de productos farmacéuticos y medicinales, cosméticos y art');

    codCiiu.set('4774','Comercio al por menor de otros productos nuevos en establecimientos especializad');

    codCiiu.set('4775','Comercio al por menor de artículos de segunda mano');

    codCiiu.set('478','Comercio al por menor en puestos de venta móviles');

    codCiiu.set('4781','Comercio al por menor de alimentos, bebidas y tabaco, en puestos de venta móvile');

    codCiiu.set('4782','Comercio al por menor de productos textiles, prendas de vestir y calzado, en pue');

    codCiiu.set('4789','Comercio al por menor de otros productos en puestos de venta móviles');

    codCiiu.set('479','Comercio al por menor no realizado en establecimientos, puestos de venta o merca');

    codCiiu.set('4791','Comercio al por menor realizado a través de Internet');

    codCiiu.set('4792','Comercio al por menor realizado a través de casas de venta o por correo');

    codCiiu.set('4799','Otros tipos de comercio al por menor no realizado en establecimientos, puestos d');

    codCiiu.set('SE','TRANSPORTE Y ALMACENAMIENTO');

    codCiiu.set('49','"Transporte terrestre; transporte por tuberías"');

    codCiiu.set('491','Transporte férreo');

    codCiiu.set('4911','Transporte férreo de pasajeros');

    codCiiu.set('4912','Transporte férreo de carga ');

    codCiiu.set('492','Transporte terrestre público automotor');

    codCiiu.set('4921','Transporte de pasajeros');

    codCiiu.set('4922','Transporte mixto');

    codCiiu.set('4923','Transporte de carga por carretera');

    codCiiu.set('493','Transporte por tuberías');

    codCiiu.set('50','Transporte acuático');

    codCiiu.set('501','Transporte marítimo y de cabotaje');

    codCiiu.set('5011','Transporte de pasajeros marítimo y de cabotaje ');

    codCiiu.set('5012','Transporte de carga marítimo y de cabotaje ');

    codCiiu.set('502','Transporte fluvial');

    codCiiu.set('5021','Transporte fluvial de pasajeros');

    codCiiu.set('5022','Transporte fluvial de carga');

    codCiiu.set('51','Transporte aéreo');

    codCiiu.set('511','Transporte aéreo de pasajeros ');

    codCiiu.set('5111','Transporte aéreo nacional de pasajeros ');

    codCiiu.set('5112','Transporte aéreo internacional de pasajeros ');

    codCiiu.set('512','Transporte aéreo de carga ');

    codCiiu.set('5121','Transporte aéreo nacional de carga ');

    codCiiu.set('5122','Transporte aéreo internacional de carga ');

    codCiiu.set('52','Almacenamiento y actividades complementarias al transporte');

    codCiiu.set('521','Almacenamiento y depósito');

    codCiiu.set('522','Actividades de las estaciones, vías y servicios complementarios para el transpor');

    codCiiu.set('5221','Actividades de estaciones, vías y servicios complementarios para el transporte t');

    codCiiu.set('5222','Actividades de puertos y servicios complementarios para el transporte acuático');

    codCiiu.set('5223','Actividades de aeropuertos, servicios de navegación aérea y demás actividades co');

    codCiiu.set('5224','Manipulación de carga');

    codCiiu.set('5229','Otras actividades complementarias al transporte');

    codCiiu.set('53','Correo y servicios de mensajería');

    codCiiu.set('531','Actividades postales nacionales');

    codCiiu.set('532','Actividades de mensajería');

    codCiiu.set('SE','ALOJAMIENTO Y SERVICIOS DE COMIDA');

    codCiiu.set('55','Alojamiento');

    codCiiu.set('551','Actividades de alojamiento de estancias cortas');

    codCiiu.set('5511','Alojamiento en hoteles ');

    codCiiu.set('5512','Alojamiento en apartahoteles');

    codCiiu.set('5513','Alojamiento en centros vacacionales ');

    codCiiu.set('5514','Alojamiento rural');

    codCiiu.set('5519','Otros tipos de alojamientos para visitantes');

    codCiiu.set('552','Actividades de zonas de camping y parques para vehículos recreacionales');

    codCiiu.set('553','Servicio por horas ');

    codCiiu.set('559','Otros tipos de alojamiento n.c.p.');

    codCiiu.set('56','Actividades de servicios de comidas y bebidas');

    codCiiu.set('561','Actividades de restaurantes, cafeterías y servicio móvil de comidas');

    codCiiu.set('5611','Expendio a la mesa de comidas preparadas');

    codCiiu.set('5612','Expendio por autoservicio de comidas preparadas');

    codCiiu.set('5613','Expendio de comidas preparadas en cafeterías');

    codCiiu.set('5619','Otros tipos de expendio de comidas preparadas n.c.p.');

    codCiiu.set('562','Actividades de catering para eventos y otros servicios de comidas');

    codCiiu.set('5621','Catering para eventos');

    codCiiu.set('5629','Actividades de otros servicios de comidas');

    codCiiu.set('563','Expendio de bebidas alcohólicas para el consumo dentro del establecimiento');

    codCiiu.set('SE','INFORMACIÓN Y COMUNICACIONES');

    codCiiu.set('58','Actividades de edición');

    codCiiu.set('581','Edición de libros, publicaciones periódicas y otras actividades de edición');

    codCiiu.set('5811','Edición de libros');

    codCiiu.set('5812','Edición de directorios y listas de correo');

    codCiiu.set('5813','Edición de periódicos, revistas y otras publicaciones periódicas');

    codCiiu.set('5819','Otros trabajos de edición');

    codCiiu.set('582','Edición de programas de informática (software)');

    codCiiu.set('59','Actividades cinematográficas, de video y producción de programas de televisión, ');

    codCiiu.set('591','Actividades de producción de películas cinematográficas, video y producción de p');

    codCiiu.set('5911','Actividades de producción de películas cinematográficas, videos, programas, anun');

    codCiiu.set('5912','Actividades de posproducción de películas cinematográficas, videos, programas, a');

    codCiiu.set('5913','Actividades de distribución de películas cinematográficas, videos, programas, an');

    codCiiu.set('5914','Actividades de exhibición de películas cinematográficas y videos');

    codCiiu.set('592','Actividades de grabación de sonido y edición de música');

    codCiiu.set('60','Actividades de programación, transmisión y/o difusión');

    codCiiu.set('601','Actividades de programación y transmisión en el servicio de radiodifusión sonora');

    codCiiu.set('602','Actividades de programación y transmisión de televisión');

    codCiiu.set('61','Telecomunicaciones');

    codCiiu.set('611','Actividades de telecomunicaciones alámbricas');

    codCiiu.set('612','Actividades de telecomunicaciones inalámbricas');

    codCiiu.set('613','Actividades de telecomunicación satelital');

    codCiiu.set('619','Otras actividades de telecomunicaciones');

    codCiiu.set('62','Desarrollo de sistemas informáticos (planificación, análisis, diseño, programaci');

    codCiiu.set('620','Desarrollo de sistemas informáticos (planificación, análisis, diseño, programaci');

    codCiiu.set('6201','Actividades de desarrollo de sistemas informáticos (planificación, análisis, dis');

    codCiiu.set('6202','Actividades de consultoría informática y actividades de administración de instal');

    codCiiu.set('6209','Otras actividades de tecnologías de información y actividades de servicios infor');

    codCiiu.set('63','Actividades de servicios de información');

    codCiiu.set('631','"Procesamiento de datos, alojamiento (hosting) y actividades relacionadas; porta');

    codCiiu.set('6311','Procesamiento de datos, alojamiento (hosting) y actividades relacionadas');

    codCiiu.set('6312','Portales web');

    codCiiu.set('639','Otras actividades de servicio de información');

    codCiiu.set('6391','Actividades de agencias de noticias');

    codCiiu.set('6399','Otras actividades de servicio de información n.c.p.');

    codCiiu.set('SE','ACTIVIDADES FINANCIERAS Y DE SEGUROS');

    codCiiu.set('64','Actividades de servicios financieros, excepto las de seguros y de pensiones');

    codCiiu.set('641','Intermediación monetaria');

    codCiiu.set('6411','Banco Central');

    codCiiu.set('6412','Bancos comerciales');

    codCiiu.set('642','Otros tipos de intermediación monetaria');

    codCiiu.set('6421','Actividades de las corporaciones financieras');

    codCiiu.set('6422','Actividades de las compañías de financiamiento');

    codCiiu.set('6423','Banca de segundo piso');

    codCiiu.set('6424','Actividades de las cooperativas financieras');

    codCiiu.set('643','Fideicomisos, fondos (incluye fondos de cesantías) y entidades financieras simil');

    codCiiu.set('6431','Fideicomisos, fondos y entidades financieras similares');

    codCiiu.set('6432','Fondos de cesantías');

    codCiiu.set('649','Otras actividades de servicio financiero, excepto las de seguros y pensiones');

    codCiiu.set('6491','Leasing financiero (arrendamiento financiero)');

    codCiiu.set('6492','Actividades financieras de fondos de empleados y otras formas asociativas del se');

    codCiiu.set('6493','Actividades de compra de cartera o factoring');

    codCiiu.set('6494','Otras actividades de distribución de fondos');

    codCiiu.set('6495','Instituciones especiales oficiales');

    codCiiu.set('6499','Otras actividades de servicio financiero, excepto las de seguros y pensiones n.c');

    codCiiu.set('65','Seguros (incluso el reaseguro), seguros sociales y fondos de pensiones, excepto ');

    codCiiu.set('651','Seguros y capitalización');

    codCiiu.set('6511','Seguros generales ');

    codCiiu.set('6512','Seguros de vida');

    codCiiu.set('6513','Reaseguros');

    codCiiu.set('6514','Capitalización');

    codCiiu.set('652','Servicios de seguros sociales de salud y riesgos profesionales');

    codCiiu.set('6521','Servicios de seguros sociales de salud');

    codCiiu.set('6522','Servicios de seguros sociales de riesgos profesionales');

    codCiiu.set('653','Servicios de seguros sociales de pensiones');

    codCiiu.set('6531','Régimen de prima media con prestación definida (RPM)');

    codCiiu.set('6532','Régimen de ahorro individual (RAI)');

    codCiiu.set('66','Actividades auxiliares de las actividades de servicios financieros');

    codCiiu.set('661','Actividades auxiliares de las actividades de servicios financieros, excepto las ');

    codCiiu.set('6611','Administración de mercados financieros');

    codCiiu.set('6612','Corretaje de valores y de contratos de productos básicos');

    codCiiu.set('6613','Otras actividades relacionadas con el mercado de valores');

    codCiiu.set('6614','Actividades de las casas de cambio');

    codCiiu.set('6615','Actividades de los profesionales de compra y venta de divisas');

    codCiiu.set('6619','Otras actividades auxiliares de las actividades de servicios financieros n.c.p.');

    codCiiu.set('662','Actividades de servicios auxiliares de los servicios de seguros y pensiones');

    codCiiu.set('6621','Actividades de agentes y corredores de seguros');

    codCiiu.set('6629','Evaluación de riesgos y daños, y otras actividades de servicios auxiliares');

    codCiiu.set('663','Actividades de administración de fondos');

    codCiiu.set('SE','ACTIVIDADES INMOBILIARIAS');

    codCiiu.set('68','Actividades inmobiliarias');

    codCiiu.set('681','Actividades inmobiliarias realizadas con bienes propios o arrendados');

    codCiiu.set('682','Actividades inmobiliarias realizadas a cambio de una retribución o por contrata ');

    codCiiu.set('SE','ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS');

    codCiiu.set('69','Actividades jurídicas y de contabilidad');

    codCiiu.set('691','Actividades jurídicas');

    codCiiu.set('692','Actividades de contabilidad, teneduría de libros, auditoría financiera y asesorí');

    codCiiu.set('70','"Actividades de administración empresarial; actividades de consultoría de gestió');

    codCiiu.set('701','Actividades de administración empresarial');

    codCiiu.set('702','Actividades de consultaría de gestión');

    codCiiu.set('71','"Actividades de arquitectura e ingeniería; ensayos y análisis técnicos"');

    codCiiu.set('711','Actividades de arquitectura e ingeniería y otras actividades conexas de consulto');

    codCiiu.set('712','Ensayos y análisis técnicos');

    codCiiu.set('72','Investigación científica y desarrollo');

    codCiiu.set('721','Investigaciones y desarrollo experimental en el campo de las ciencias naturales ');

    codCiiu.set('722','Investigaciones y desarrollo experimental en el campo de las ciencias sociales y');

    codCiiu.set('73','Publicidad y estudios de mercado');

    codCiiu.set('731','Publicidad');

    codCiiu.set('732','Estudios de mercado y realización de encuestas de opinión pública');

    codCiiu.set('74','Otras actividades profesionales, científicas y técnicas');

    codCiiu.set('741','Actividades especializadas de diseño ');

    codCiiu.set('742','Actividades de fotografía');

    codCiiu.set('749','Otras actividades profesionales, científicas y técnicas n.c.p.');

    codCiiu.set('75','Actividades veterinarias');

    codCiiu.set('750','Actividades veterinarias');

    codCiiu.set('SE','ACTIVIDADES DE SERVICIOS ADMINISTRATIVOS Y DE APOYO');

    codCiiu.set('77','Actividades de alquiler y arrendamiento');

    codCiiu.set('771','Alquiler y arrendamiento de vehículos automotores');

    codCiiu.set('772','Alquiler y arrendamiento de efectos personales y enseres domésticos');

    codCiiu.set('7721','Alquiler y arrendamiento de equipo recreativo y deportivo');

    codCiiu.set('7722','Alquiler de videos y discos ');

    codCiiu.set('7729','Alquiler y arrendamiento de otros efectos personales y enseres domésticos n.c.p.');

    codCiiu.set('773','Alquiler y arrendamiento de otros tipos de maquinaria, equipo y bienes tangibles');

    codCiiu.set('774','Arrendamiento de propiedad intelectual y productos similares, excepto obras prot');

    codCiiu.set('78','Actividades de empleo');

    codCiiu.set('781','Actividades de agencias de empleo');

    codCiiu.set('782','Actividades de agencias de empleo temporal');

    codCiiu.set('783','Otras actividades de suministro de recurso humano');

    codCiiu.set('79','Actividades de las agencias de viajes, operadores turísticos, servicios de reser');

    codCiiu.set('791','Actividades de las agencias de viajes y operadores turísticos');

    codCiiu.set('7911','Actividades de las agencias de viaje');

    codCiiu.set('7912','Actividades de operadores turísticos');

    codCiiu.set('799','Otros servicios de reserva y actividades relacionadas');

    codCiiu.set('80','Actividades de seguridad e investigación privada');

    codCiiu.set('801','Actividades de seguridad privada');

    codCiiu.set('802','Actividades de servicios de sistemas de seguridad');

    codCiiu.set('803','Actividades de detectives e investigadores privados');

    codCiiu.set('81','Actividades de servicios a edificios y paisajismo (jardines, zonas verdes)');

    codCiiu.set('811','Actividades combinadas de apoyo a instalaciones');

    codCiiu.set('812','Actividades de limpieza');

    codCiiu.set('8121','Limpieza general interior de edificios');

    codCiiu.set('8129','Otras actividades de limpieza de edificios e instalaciones industriales');

    codCiiu.set('813','Actividades de paisajismo y servicios de mantenimiento conexos');

    codCiiu.set('82','Actividades administrativas y de apoyo de oficina y otras actividades de apoyo a');

    codCiiu.set('821','Actividades administrativas y de apoyo de oficina');

    codCiiu.set('8211','Actividades combinadas de servicios administrativos de oficina');

    codCiiu.set('8219','Fotocopiado, preparación de documentos y otras actividades especializadas de apo');

    codCiiu.set('822','Actividades de centros de llamadas (Call center)');

    codCiiu.set('823','Organización de convenciones y eventos comerciales');

    codCiiu.set('829','Actividades de servicios de apoyo a las empresas n.c.p.');

    codCiiu.set('8291','Actividades de agencias de cobranza y oficinas de calificación crediticia');

    codCiiu.set('8292','Actividades de envase y empaque');

    codCiiu.set('8299','Otras actividades de servicio de apoyo a las empresas n.c.p.');

    codCiiu.set('SE','"ADMINISTRACIÓN PÚBLICA Y DEFENSA; PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLI');

    codCiiu.set('84','"Administración pública y defensa; planes de seguridad social de afiliación obli');

    codCiiu.set('841','Administración del Estado y aplicación de la política económica y social de la c');

    codCiiu.set('8411','Actividades legislativas de la administración pública');

    codCiiu.set('8412','Actividades ejecutivas de la administración pública');

    codCiiu.set('8413','Regulación de las actividades de organismos que prestan servicios de salud, educ');

    codCiiu.set('8414','Actividades reguladoras y facilitadoras de la actividad económica');

    codCiiu.set('8415','Actividades de los otros órganos de control');

    codCiiu.set('842','Prestación de servicios a la comunidad en general');

    codCiiu.set('8421','Relaciones exteriores ');

    codCiiu.set('8422','Actividades de defensa');

    codCiiu.set('8423','Orden público y actividades de seguridad');

    codCiiu.set('8424','Administración de justicia');

    codCiiu.set('843','Actividades de planes de seguridad social de afiliación obligatoria');

    codCiiu.set('SE','EDUCACIÓN');

    codCiiu.set('85','Educación');

    codCiiu.set('851','Educación de la primera infancia, preescolar y básica primaria');

    codCiiu.set('8511','Educación de la primera infancia');

    codCiiu.set('8512','Educación preescolar');

    codCiiu.set('8513','Educación básica primaria');

    codCiiu.set('852','Educación secundaria y de formación laboral');

    codCiiu.set('8521','Educación básica secundaria ');

    codCiiu.set('8522','Educación media académica');

    codCiiu.set('8523','Educación media técnica y de formación laboral');

    codCiiu.set('853','Establecimientos que combinan diferentes niveles de educación ');

    codCiiu.set('854','Educación superior');

    codCiiu.set('8541','Educación técnica profesional');

    codCiiu.set('8542','Educación tecnológica');

    codCiiu.set('8543','Educación de instituciones universitarias o de escuelas tecnológicas');

    codCiiu.set('8544','Educación de universidades');

    codCiiu.set('855','Otros tipos de educación');

    codCiiu.set('8551','Formación académica no formal ');

    codCiiu.set('8552','Enseñanza deportiva y recreativa');

    codCiiu.set('8553','Enseñanza cultural');

    codCiiu.set('8559','Otros tipos de educación n.c.p.');

    codCiiu.set('856','Actividades de apoyo a la educación');

    codCiiu.set('SE','ACTIVIDADES DE ATENCIÓN DE LA SALUD HUMANA Y DE ASISTENCIA SOCIAL');

    codCiiu.set('86','Actividades de atención de la salud humana');

    codCiiu.set('861','Actividades de hospitales y clínicas, con internación');

    codCiiu.set('862','Actividades de práctica médica y odontológica, sin internación ');

    codCiiu.set('8621','Actividades de la práctica médica, sin internación');

    codCiiu.set('8622','Actividades de la práctica odontológica');

    codCiiu.set('869','Otras actividades de atención relacionadas con la salud humana');

    codCiiu.set('8691','Actividades de apoyo diagnóstico');

    codCiiu.set('8692','Actividades de apoyo terapéutico');

    codCiiu.set('8699','Otras actividades de atención de la salud humana');

    codCiiu.set('87','Actividades de atención residencial medicalizada');

    codCiiu.set('871','Actividades de atención residencial medicalizada de tipo general');

    codCiiu.set('872','Actividades de atención residencial, para el cuidado de pacientes con retardo me');

    codCiiu.set('873','Actividades de atención en instituciones para el cuidado de personas mayores y/o');

    codCiiu.set('879','Otras actividades de atención en instituciones con alojamiento');

    codCiiu.set('88','Actividades de asistencia social sin alojamiento');

    codCiiu.set('881','Actividades de asistencia social sin alojamiento para personas mayores y discapa');

    codCiiu.set('889','Otras actividades de asistencia social sin alojamiento');

    codCiiu.set('SE','ACTIVIDADES ARTÍSTICAS, DE ENTRETENIMIENTO Y RECREACIÓN');

    codCiiu.set('90','Actividades creativas, artísticas y de entretenimiento');

    codCiiu.set('900','Actividades creativas, artísticas y de entretenimiento ');

    codCiiu.set('9001','Creación literaria');

    codCiiu.set('9002','Creación musical');

    codCiiu.set('9003','Creación teatral');

    codCiiu.set('9004','Creación audiovisual');

    codCiiu.set('9005','Artes plásticas y visuales');

    codCiiu.set('9006','Actividades teatrales');

    codCiiu.set('9007','Actividades de espectáculos musicales en vivo');

    codCiiu.set('9008','Otras actividades de espectáculos en vivo');

    codCiiu.set('91','Actividades de bibliotecas, archivos, museos y otras actividades culturales');

    codCiiu.set('910','Actividades de bibliotecas, archivos, museos y otras actividades culturales');

    codCiiu.set('9101','Actividades de bibliotecas y archivos');

    codCiiu.set('9102','Actividades y funcionamiento de museos, conservación de edificios y sitios histó');

    codCiiu.set('9103','Actividades de jardines botánicos, zoológicos y reservas naturales');

    codCiiu.set('92','Actividades de juegos de azar y apuestas');

    codCiiu.set('920','Actividades de juegos de azar y apuestas');

    codCiiu.set('93','Actividades deportivas y actividades recreativas y de esparcimiento');

    codCiiu.set('931','Actividades deportivas');

    codCiiu.set('9311','Gestión de instalaciones deportivas');

    codCiiu.set('9312','Actividades de clubes deportivos');

    codCiiu.set('9319','Otras actividades deportivas');

    codCiiu.set('932','Otras actividades recreativas y de esparcimiento');

    codCiiu.set('9321','Actividades de parques de atracciones y parques temáticos');

    codCiiu.set('9329','Otras actividades recreativas y de esparcimiento n.c.p.');

    codCiiu.set('SE','OTRAS ACTIVIDADES DE SERVICIOS');

    codCiiu.set('94','Actividades de asociaciones');

    codCiiu.set('941','Actividades de asociaciones empresariales y de empleadores, ');

    codCiiu.set('','y asociaciones profesionales ');

    codCiiu.set('9411','Actividades de asociaciones empresariales y de empleadores');

    codCiiu.set('9412','Actividades de asociaciones profesionales');

    codCiiu.set('942','Actividades de sindicatos de empleados');

    codCiiu.set('949','Actividades de otras asociaciones');

    codCiiu.set('9491','Actividades de asociaciones religiosas');

    codCiiu.set('9492','Actividades de asociaciones políticas');

    codCiiu.set('9499','Actividades de otras asociaciones n.c.p.');

    codCiiu.set('95','Mantenimiento y reparación de computadores, efectos personales y enseres domésti');

    codCiiu.set('951','Mantenimiento y reparación de computadores y equipo de comunicaciones');

    codCiiu.set('9511','Mantenimiento y reparación de computadores y de equipo periférico');

    codCiiu.set('9512','Mantenimiento y reparación de equipos de comunicación');

    codCiiu.set('952','Mantenimiento y reparación de efectos personales y enseres domésticos');

    codCiiu.set('9521','Mantenimiento y reparación de aparatos electrónicos de consumo');

    codCiiu.set('9522','Mantenimiento y reparación de aparatos y equipos domésticos y de jardinería ');

    codCiiu.set('95','Reparación de calzado y artículos de cuero');

    codCiiu.set('9524','Reparación de muebles y accesorios para el hogar');

    codCiiu.set('9529','Mantenimiento y reparación de otros efectos personales y enseres domésticos');

    codCiiu.set('96','Otras actividades de servicios personales');

    codCiiu.set('960','Otras actividades de servicios personales');

    codCiiu.set('9601','Lavado y limpieza, incluso la limpieza en seco, de productos textiles y de piel');

    codCiiu.set('9602','Peluquería y otros tratamientos de belleza');

    codCiiu.set('9603','Pompas fúnebres y actividades relacionadas');

    codCiiu.set('9609','Otras actividades de servicios personales n.c.p.');

    codCiiu.set('SE','"ACTIVIDADES DE LOS HOGARES INDIVIDUALES EN CALIDAD DE EMPLEADORES; ACTIVIDADES ');

    codCiiu.set('97','Actividades de los hogares individuales como empleadores de personal doméstico');

    codCiiu.set('970','Actividades de los hogares individuales como empleadores de personal doméstico');

    codCiiu.set('98','Actividades no diferenciadas de los hogares individuales como productores de bie');

    codCiiu.set('981','Actividades no diferenciadas de los hogares individuales como productores de bie');

    codCiiu.set('982','Actividades no diferenciadas de los hogares individuales como productores de ser');

    codCiiu.set('SE','ACTIVIDADES DE ORGANIZACIONES Y ENTIDADES EXTRATERRITORIALES ');

    codCiiu.set('99','Actividades de organizaciones y entidades extraterritoriales');

    codCiiu.set('990','Actividades de organizaciones y entidades extraterritoriales');

}