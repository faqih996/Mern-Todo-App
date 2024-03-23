import { Request, Response } from 'express'

import TodoModel from '../../models/todo'
import { Todo } from '../../types/todo'

// index, get array data from mongoose database
export const getTodos = async (req: Request, res: Response): Promise<void> => {

    const todos: Todo[] = await TodoModel.find()

    // menampilkan pesan sukses dan menampilkan semua data hasil dari todos jika berhasil
    res.status(200).json({ todos })
}

// details, menampilkan data berdasarkan id
export const getTodo = async (req: Request, res: Response): Promise<void> => {

    await TodoModel.findById(req.params.id, (err, result) => {

        // memberikan pesan error dan sukses
        if (err) {
            // memberi pesan error
            res.status(400).json({

                error: err
            })
        } else {
            // memberi pesan sukses
            res.status(200).json({ result })
        }
    })


}

// add, menambahkan data
// memberikan promise / validasi sesuai atau tidak
export const addTodo = async (req: Request, res: Response): Promise<void> => {
    //request title dan status dari body 
    const body: Pick<Todo, 'title' | 'status'> = req.body

    if (!body.title || !body.status) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status: ${body.status}`
        });

        // return supaya jika terjadi error maka code dibawah return tidak perlu dijalankan
        return
    }

    // membuat data baru berdasarkan model
    const newTodoModel = new TodoModel({
        // mengambil data dari body untuk dimasukan ke database
        title: body.title,
        status: body.status
    })

    // input data kedalam database
    const newTodo = await newTodoModel.save()

    // show data terupdate dari database setelah tambah data / return to index with new
    const updatedAllTodosAfterSave = await TodoModel.find()

    // memberi pesan sukses dan tampil semua data
    res.status(201).json({
        message: 'Todo successfully added!',
        addedTodo: newTodo,
        allTodosAfterAddition: updatedAllTodosAfterSave
    })

}

// update todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    // validasi data dan parameter id sebagai request
    const {
        params: { id },
        body
    } = req

    // membuat validasi jika salah satu req undefinde
    if (!body.title || !body.status || !id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: _id or required body properties is not defined`
        })

        // return supaya jika terjadi error maka code dibawah return tidak perlu dijalankan
        return
    }

    // _id karna dalam database id yg dibuat dari todoModel menggunakan _,
    // id berasal dari params dari url
    const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body)

    // show data terupdate dari database setelah tambah data / return to index with new
    const updatedAllTodosAfterUpdate = await TodoModel.find()

    // guard jika gagal
    if (!updatedTodo) {
        res
            .status(501)
            .json({ status: 501, errorMessage: 'Edit todo failed. Not implemented' });

        return;
    }

    // memberi pesan sukses dan tampil semua data
    res.status(200).json({
        message: 'Todo successfully edited',
        updatedTodo,
        todos: updatedAllTodosAfterUpdate
    });
};

// remove todo
export const removeTodo = async (req: Request, res: Response): Promise<void> => {
    // validasi parameter id sebagai request
    const {
        params: { id },
    } = req

    // membuat validasi jika salah satu req undefinde
    if (!id) {
        res.status(401).json({
            status: 401,
            errorMessage: `ValidationError: Params _id is not defined`
        })

        // return supaya jika terjadi error maka code dibawah return tidak perlu dijalankan
        return
    }

    const removedTodo = await TodoModel.findByIdAndRemove(id)
    const updatedAllTodosAfterRemove = await TodoModel.find()

    // guard jika gagal
    if (!removedTodo) {
        res
            .status(501)
            .json({ status: 501, errorMessage: 'Remo ve todo failed. Not implemented' });

        return
    }

    // memberi pesan sukses dan tampil semua data
    res.status(200).json({
        message: 'Todo successfully removed',
        removedTodo,
        todos: updatedAllTodosAfterRemove
    });
}