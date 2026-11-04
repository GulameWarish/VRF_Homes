import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, brand, featured, search, limit = 50, page = 1 } = req.query;
    const query = req.query.all === 'true' ? {} : { isPublished: true };

    if (category) {
      const catTrim = category.trim();
      if (/^duct/i.test(catTrim)) {
        query.category = { $regex: /duct/i };
      } else if (/^cassette/i.test(catTrim)) {
        query.category = { $regex: /cassette/i };
      } else if (/^split/i.test(catTrim)) {
        query.category = { $regex: /split/i };
      } else if (/^tower/i.test(catTrim)) {
        query.category = { $regex: /tower/i };
      } else if (/^conceal/i.test(catTrim)) {
        query.category = { $regex: /conceal/i };
      } else if (/^chiller/i.test(catTrim)) {
        query.category = { $regex: /chiller/i };
      } else if (/^vrf/i.test(catTrim)) {
        query.category = { $regex: /vrf/i };
      } else if (/^ahu|air handling/i.test(catTrim)) {
        query.category = { $regex: /ahu|handling/i };
      } else {
        query.category = { $regex: new RegExp(`^${catTrim}$`, 'i') };
      }
    }

    if (brand) {
      query.relatedBrands = { $in: [new RegExp(brand, 'i')] };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ sortOrder: 1, isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products from the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isPublished: true
    }).limit(4);

    res.json({
      success: true,
      data: product,
      relatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const exists = await Product.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Product with this slug already exists' });
    }

    const product = await Product.create({
      ...req.body,
      slug
    });

    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
