import mongoose = require("mongoose");
import {IEpisodio , getEpisodio} from "./Episodios"
import {connectMongoDB} from "./helpers"

interface Anime extends mongoose.Document { 
    name: string;
    episode_Number: IEpisodio;
    genero: string;
    descripcion: string;
}

const AnimeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    episode_Number: { type: mongoose.Schema.Types.ObjectId, ref: "Episodio" },
    genero: {type: Number, required: true},
    descripcion: {type: String, required: true}
});


export const Anime = mongoose.model<Anime>("Anime", AnimeSchema);

export const CreateAnime = async function(name:string, episode_Number:string, genero: string,descripcion:string){
    //Conectar con la base de datos
    await connectMongoDB;
    //Obtener el proveedor en funcion del nombre
    const epi:any = await getEpisodio(episode_Number);

    //persistencia de nuestro producto
    const ep = new Anime();
    ep.name =name;
    ep.episode_Number = epi;
    ep.genero =genero;
    ep.descripcion =descripcion;

    ep.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(ep);
        }
    });
}

