import React, { useState, useEffect } from 'react'

const Form = () => {
    const [form, setForm] = useState({ name: "", email: "" })
    const [localform, setlocalForm] = useState({name:"",email:""});

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const rawData = localStorage.getItem("form");
                const formData = JSON.parse(rawData);
                console.log("this is formdata: ",formData)
                setlocalForm((prev)=>({
                    ...prev,name:formData.name,email: formData.email
                    }));
                // console.log("localStorage Data: ",localform);
            } catch (error) {
                console.log(error);
            }

        }
        fetchForm();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = JSON.stringify(form)
        localStorage.setItem("form", formData);
        console.log(form)
        alert(`Name: ${form.name} Email: ${form.email}`)

    }
    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "green", border: "1px solid black", overflow: "hidden" }}>

            <form onSubmit={handleSubmit} style={{ height: "60vh", padding: "30px", overflow: "hidden", backgroundColor: "white", display: "flex", flexDirection: "column", gap: "20px" }}>
                <label htmlFor="name" style={{ color: "black" }}>Name:
                    <input style={{ marginLeft: "20px", padding: "10px 5px" }} type="text" placeholder='Enter you name..' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>

                <label htmlFor="Email" style={{ color: "black" }}>Email:
                    <input style={{ marginLeft: "20px", padding: "10px 5px" }} type="email" placeholder='Enter you name..' onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>

                <input type="submit" style={{ cursor: "pointer", padding: "10px 5px" }} />

            </form>

            <table border="1" cellPadding="8" style={{marginTop:"5px"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    <tr key="1">
                        <td>{localform.name}</td>
                        <td>{localform.email}</td>
                        <button style={{padding:"10px 25px", marginTop:"5px", backgroundColor:"black", color:"white", cursor:"pointer"}} type='submit'>Edit</button>
                    </tr>
                </tbody>


            </table>


        </div>
    )
}

export default Form