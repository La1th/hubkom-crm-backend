const Prospect = require('../models/Prospect');

// Get all prospects
exports.getProspects = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    
    // Build query filters
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    const prospects = await Prospect.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json(prospects);
  } catch (error) {
    next(error);
  }
};

// Get a single prospect by ID
exports.getProspect = async (req, res, next) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
    
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    
    res.status(200).json(prospect);
  } catch (error) {
    next(error);
  }
};

// Create a new prospect
exports.createProspect = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, status, notes } = req.body;
    
    // Create new prospect
    const prospect = new Prospect({
      fullName,
      email,
      phoneNumber,
      status: status || 'New Lead',
      notes: notes ? [{ content: notes }] : []
    });
    
    const savedProspect = await prospect.save();
    
    res.status(201).json(savedProspect);
  } catch (error) {
    next(error);
  }
};

// Update a prospect
exports.updateProspect = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, status } = req.body;
    
    // Find and update the prospect
    const updatedProspect = await Prospect.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phoneNumber, status },
      { new: true, runValidators: true }
    );
    
    if (!updatedProspect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    
    res.status(200).json(updatedProspect);
  } catch (error) {
    next(error);
  }
};

// Delete a prospect
exports.deleteProspect = async (req, res, next) => {
  try {
    const prospect = await Prospect.findByIdAndDelete(req.params.id);
    
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    
    res.status(200).json({ message: 'Prospect deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add a note to a prospect
exports.addNote = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Note content is required' });
    }
    
    const prospect = await Prospect.findById(req.params.id);
    
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    
    prospect.notes.push({
      content,
      createdAt: new Date(),
      user: req.body.user || 'Admin'
    });
    
    await prospect.save();
    
    res.status(200).json(prospect);
  } catch (error) {
    next(error);
  }
};

// Add an activity to a prospect
exports.addActivity = async (req, res, next) => {
  try {
    const { type, description } = req.body;
    
    if (!type || !description) {
      return res.status(400).json({ message: 'Activity type and description are required' });
    }
    
    const prospect = await Prospect.findById(req.params.id);
    
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    
    prospect.activities.push({
      type,
      description,
      createdAt: new Date(),
      user: req.body.user || 'Admin'
    });
    
    // Update last contact date
    prospect.lastContact = new Date();
    
    await prospect.save();
    
    res.status(200).json(prospect);
  } catch (error) {
    next(error);
  }
}; 