
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <App/>
)

function Counter(props){
    
    return(
        <div className="counter">
        <button onClick={()=>props.hdlUpdate(props.item.id,-1)}> - </button>
        <h3>{props.item.number}</h3>
        <button onClick={()=>props.hdlUpdate(props.item.id,+1)}> + </button>
        <button onClick ={()=>props.hdlUpdate(props.item.id,-props.item.number)}> C </button>
        <button onClick ={()=>props.DelCounter(props.item.id)}>X</button>
        </div>
    )
}

function SumInfo(props){
    
    const styles = {
        color : props.color,
        fontSize : props.size==="big" ? "50px" : "24px"
    }
    return(
        
       <div className="suminfo">
        <h1 style={styles}>Sum = {props.total}</h1>
       </div>
    )
}

function App(){
    const [counters , setCounters] = React.useState([{id: 1 , number: 0}])
    const total = counters.reduce((a,c)=>a+c.number,0)  ;  // let allCounter= Array(counters).fill(<Counter/>)
    const AddCounter = ()=>{
        let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
        // setCounters([...counters,{id:newId ,number: 0 }])
        const cloneCounters = [...counters]
        cloneCounters.push({id:newId , number:0 })
        setCounters(cloneCounters)
    }
    const DelCounter = (id)=>{
       const cloneCounters= [...counters]
       let idx = cloneCounters.findIndex(el => el.id ===id)
       cloneCounters.splice(idx,1)
       setCounters(cloneCounters)
    }
    const hdlUpdate = (id , num)=>{
        const cloneCounters = [...counters]
        let idx = cloneCounters.findIndex(el => el.id === id)
        cloneCounters[idx].number += num
        if(cloneCounters[idx].number<0){
            cloneCounters[idx].number = 0
            return
        }
        setCounters(cloneCounters)
    }
   
    return(
        <>
        <h1 style = {{color : "red"}} className="text-center">Codecamp Academy</h1>
        <button className="text-center" onClick={ AddCounter }>Add Counter</button>
        <SumInfo color="deepPink" size="big" total = {total}/>
        {/* <Counter/> */}
        {/* {allCounter} */}
        {counters.map( el => {
            return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} DelCounter={DelCounter}/>
        })}
        </>
        )
     
}