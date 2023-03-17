const handler = async (req, res)=>{
    if(req.method === "POST"){
            let resp = await fetch(`http://127.0.0.1:3001/file?path=${req.query.path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, })
            let response = await resp.json() 
            res.json(response)
        }
    else{
        res.status(400).json({err : "The method is not allowed for the requested URL."})
    }
}
export default handler