const ClienteModel = require('../models/cliente.model');

class ClienteController {
    static async buscarTodos(req, res, next) {
        try {
            // Chama o Model para buscar os dados
            const clientes = await ClienteModel.buscarTodos();
            // Retorna os dados formatados
            res.json({ success: true, data: clientes, count: clientes.length });
        } catch (error) {
            // Se houver erro, passa para o middleware de erros
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            // Chama o Model para buscar os dados
            const cliente = await ClienteModel.buscarPorId(req.params.id);
            // Verifica se o cliente existe
            if (!cliente) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            // Retorna os dados formatados
            res.json({ success: true, data: cliente });
        } catch (error) {
            // Se houver erro, passa para o middleware de erros
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            // Chama o Model para inserir os dados
            const cliente = await ClienteModel.criar(req.body);
            // Retorna os dados formatados
            res.status(201).json({ success: true, message: 'Cliente criado com sucesso', data: cliente });
        } catch (error) {
            // Se houver erro, passa para o middleware de erros
            next(error);
        }
    }

    static async alterar(req, res, next) {
        try {
            // Chama o Model para alterar os dados
            const cliente = await ClienteModel.alterar(req.params.id, req.body);
            // Verifica se o cliente existe
            if (!cliente) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            // Retorna os dados formatados
            res.json({ success: true, message: 'Cliente atualizado com sucesso', data: cliente });
        } catch (error) {
            // Se houver erro, passa para o middleware de erros
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            // Chama o Model para deletar os dados
            const result = await ClienteModel.excluir(req.params.id);
            // Retorna os dados formatados
            res.json({ success: true, message: 'Cliente deletado com sucesso', data: cliente });
        } catch (error) {
            // Se houver erro, passa para o middleware de erros
            next(error);
        }
    }
}

module.exports = ClienteController;
