import { Service } from '../Models/Service.js';

// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single service by serviceNum
export const getServiceByNum = async (req, res) => {
    try {
        const services = await Service.findOne({ serviceNum: req.params.serviceNum });
        if (services) {
            res.status(200).json({ serviceType: services.serviceType});
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new Service
export const createService = async (req, res) => {
    const { serviceNum, serviceType } = req.body;

    const newService = new Service({
        serviceNum,
        serviceType        
    });

    try {
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing service
export const updateService = async (req, res) => {
    const { serviceNum } = req.params;
    const { serviceType } = req.body;

    try {
        const updatedService = await Service.findOneAndUpdate(
            { serviceNum },
            { serviceType },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a service
export const deleteService = async (req, res) => {
    const { serviceNum } = req.params;

    try {
        const deletedService = await Service.findOneAndDelete({ serviceNum });

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
