import Partner from "../Models/ChannelPartner.js";
import Attendant from "../Models/Attendant.js";
import Project from "../Models/projectModel.js";

export const createPartner = async (req, res) => {
  try {
    const { channelPartnerName, channelPartnerCompanyName, customerName, customerMobileLastFour, projectName, projectLocation } = req.body;

    const project = await Project.findOne({ name: projectName, location: projectLocation });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { teams } = project;

    const availableAttendant = await Attendant.findOneAndUpdate(
      { status: 'available', team: { $in: teams } },
      { status: 'assigned' },
      { new: true }
    );

    if (!availableAttendant) {
      return res.status(400).json({ message: 'No available attendants of the same team.' });
    }

    // const partners = await Partner.find({});
    // const partnerId = `CHROF${(partners.length + 1).toString()}`;

    const lastPartner = await Partner.findOne().sort({ $natural: -1 });
    let partnerId;
    if (lastPartner) {
        const lastPartnerIdNum = parseInt(lastPartner.partnerId.substring(5));
        partnerId = `CHROF${(lastPartnerIdNum + 1).toString()}`;
    }
    else {
      partnerId = 'CHROF1';
    }

    const newPartner = await Partner.create({
      channelPartnerName,
      channelPartnerCompanyName,
      customerName,
      customerMobileLastFour,
      projectName,
      projectLocation,
      partnerId,
      attendant: availableAttendant._id,
      attendantName: availableAttendant.name
    });

    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json({ message: 'Partner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
