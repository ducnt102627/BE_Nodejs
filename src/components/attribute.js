import Atrribute, { ValueAttributeModel } from "../model/attribute";

export const createAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        const attribute = new Atrribute({ name, });
        const newAttribute = await attribute.save();
        console.log(newAttribute)
        res.status(201).json(newAttribute)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getAttribute = async (req, res) => {
    try {
        const attributes = await Atrribute.find();
        res.status(201).json(attributes)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getAttributeById = async (req, res) => {
    try {
        const attribute = await Atrribute.findById(req.params.id).populate("values");
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.status(201).json(attribute)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const updateAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        const attribute = await Atrribute.findById(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        attribute.name = name;
        const uppdatedAttribute = await attribute.save();
        res.status(201).json(uppdatedAttribute)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const deleteAttribute = async (req, res) => {
    try {
        const attribute = await Atrribute.findById(req.params.id);
        if (!attribute) {
            return res.stauts(404).json({ message: "Attribute not found" });
        }
        const deletedAttribute = await attribute.remove();
        res.status(201).json({ message: "Delete attribute success", deletedAttribute })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//=====================Value========================
export const createValueAttribute = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const attribute = await Atrribute.findById(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" })
        }
        const valueAttribute = new ValueAttributeModel({ name, price, quantity });
        const newValueAttribute = await attribute.save();
        attribute.values.push(newValueAttribute);
        await attribute.save();
        res.status(201).json(newValueAttribute)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getAllValueAttribute = async (req, res) => {
    try {
        const value = await ValueAttributeModel.find();
        res.status(201).json(value);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getValueAttributeById = async (req, res) => {
    try {
        const value = await ValueAttributeModel.findById(req.params.id);
        if (!value) {
            return res.status(404).json({ message: "ValueAttribute not found" })
        }
        res.status(201).json(value)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const updateValueAttribute = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const value = await ValueAttributeModel.findById(req.params.id);
        if (!value) {
            return res.status(404).json({ message: "ValueAttribte not found" });
        }
        value.name = name;
        value.price = price;
        value.quantity = quantity
        const updatedValue = await value.save();
        res.status(201).json(updatedValue)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const deleteValueAttribute = async (req, res) => {
    try {
        const value = await ValueAttributeModel.findById(req.params.id);
        if (!value) {
            return res.status(404).json({ message: "ValueAttribute not found" });
        }
        await value.remove();
        res.status(201).json({ message: "Delete value successfully" })
    } catch (error) {
        return res.stauts(500).json({ message: error.message })
    }
}