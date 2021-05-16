import { Request, Response, NextFunction } from "express";
import mainService  from "../../services/v0/_mainServices";
import _response from "../../services/v0/_utils";
const { MainService } = mainService;
import NodeCache from 'node-cache';
const cache = new NodeCache();

let data:null|any;
// let cacheTime: Date|number;

export const mainData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // Check for item in cache
        // if no cache, fetch then store in cache
        let value: any = cache.get( "Data" );
        console.log(new Date(Date.now()))
        const fromData = new Date()
        if ( value == undefined ){
            // handle miss!
            console.log('fetch')
            const mainInstance = new MainService();
            
            cache.set("Data", data, 3600)
        } else {
            console.log('no fetch')
            data = value;
        }
        const toData = new Date()   
        console.log(`Time taken in: ${toData.getTime() - fromData.getTime() }`)

        return res.status(200).json(data);
    } catch (err){
        next(err)
    }
}
