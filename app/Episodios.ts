import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IEpisodio extends mongoose.Document { 
    Name: string;
    Season: number;
    Duracion_Time: string;
    Comentary: string;
    staf_Member: number;
}

const EpisodioSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Duracion_Time: {type: String, required: true},
    Season: { type: String, required: false } ,
    Comentary: { type: String ,required: false },
    staf_Member:{ type: Number , required: false}
});

export const Episodio = mongoose.model<IEpisodio>("Episodio", EpisodioSchema);

export const CreateEpisodio = async function(Name: string, Season: number, Duracion_Time: string , Comentary: string , staf_Member: number){
    await connectMongoDB;

    const newOne = new Episodio();
    newOne.Name = Name;
    newOne.Season = Season;
    newOne.Duracion_Time = Duracion_Time;
    newOne.Comentary = Comentary;
    newOne.staf_Member = staf_Member;

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getEpisodio(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        Episodio.findOne({ Name: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}

