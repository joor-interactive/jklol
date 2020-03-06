import React from "react";
import Contractor from "./type"

const contractorRow = (contractor: Contractor) => {
    return <div>{contractor.name}</div>
}

type ContractorsProps = {
    contractors: Contractor[]
}

const Contractors: React.FC<ContractorsProps> = ({contractors}) => {
    return <div>
        <table>
            { contractors.map(contractor => contractorRow(contractor)) }
        </table>
    </div>
}

export default Contractors; 