import BranchesTable from "./BranchesTable"

const Branches=() => {
    return (
        <>
            <div style={{marginRight:'13%', marginTop:'7%'}}>
                <div style={{fontSize:'40px', fontWeight:'bold'}}>
                    סניפי אלקטרה חשמל 
                </div>
                <div>
                    אלקטרה חשמל היא הרשת המובילה והמשתלמת בתחום מוצרי החשמל בישראל  
                </div>
                <div >
                    7 סניפי הרשת פרוסים מהצפון ועד לדרום
                </div>
                <div> 
                    בהם נהנים לקוחותינו משירות אדיב ומקצועי
                </div>
            </div>
            <div style={{marginRight:'13%', marginTop:'7%'}}> 
                <BranchesTable /> 
            </div>
        </>
    )
}
export default Branches