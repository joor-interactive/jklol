import React from 'react';
import Contractor from "./type"
import {useContext, useEffect} from "react";
import {AppContext} from "../App";
import {interval} from "rxjs";

const ContractorRow = ({contractor} : {contractor: Contractor}) => {
   const {gameEvents} = useContext(AppContext);
   useEffect(() => {
      const obs = interval(contractor.speedMs).subscribe(() => {
         gameEvents.OnProgress.next(contractor.quality)
      });
      return () => obs.unsubscribe();
   });
   return <div>{contractor.name}</div>
}

type ContractorsProps = {
   contractors: Contractor[]
}

const Contractors: React.FC<ContractorsProps> = ({contractors}) => {
   return <div>
         {contractors.map(contractor => <ContractorRow contractor={contractor}/>)}
   </div>
}

export default Contractors;