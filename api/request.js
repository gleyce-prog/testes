import axios from "axios";

export default async function handler(req, res) {
    const url = 'http://localhost:8080/'; // URL do seu servidor local

    try {
        let response;
        switch (req.method) {
            case 'GET':
                response = await axios.get(url);
                console.log("Data", response.data);
                console.log("Status", response.status);
                res.status(200).json(response.data);
                break;
            case 'POST':
                response = await axios.post(url, req.body);
                res.status(response.status).json(response.data);
                break;
            case 'PUT':
                response = await axios.put(url, req.body);
                res.status(response.status).json(response.data);
                break;
            case 'DELETE':
                response = await axios.delete(url, { data: req.body });
                res.status(response.status).json(response.data);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error); // Para depuração
        res.status(500).json({ error: 'Erro ao conectar com o servidor local.' });
    }
}
