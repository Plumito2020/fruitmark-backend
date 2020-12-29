const Stock = require("../models/stock");

exports.getStock = (req, res, next) => {
  Stock.find()
    .then((stock) => {
      if (stock) {
        res.status(200).json({
          message: "SUCCESS",
          data: stock,
        });
      }

      const error = new Error("Could not find meetings.");
      error.statusCode = 404;

      throw error;
    })
    .catch((err) => {
      next(err);
    });
};

exports.transferer = async (req, res, next) => {
  const src = req.body.src;
  const dest = req.body.dest;
  const fruit = req.body.fruit;
  const qte = req.body.qte;

  // --- SOURCE
  const responseSrc = await Stock.findOne({ ville: src });
  
  let qteSrc = 0 ;
  let qteTransfer = 0 ;
  responseSrc.stock.forEach(element => {
    if (element.get('nom') === fruit) {
      qteSrc = element.get('stock');
      if (qteSrc < qte) {
        element.set('stock' , 0 );
        qteTransfer = qteSrc ;
      }
      else{
        element.set('stock' , qteSrc - qte );
        qteTransfer = qte ;
      }
      
    }
  });

  await Stock.findOneAndUpdate({ ville: src } , { $set :  {stock : responseSrc.stock}  });

    // --- DEST
    const responseDest = await Stock.findOne({ ville: dest });
  
    let qteDest = 0 ;
    responseDest.stock.forEach(element => {
      if (element.get('nom') === fruit) {
        qteDest = element.get('stock');
        element.set('stock' , qteDest + qteTransfer );
      }
    });
  
    await Stock.findOneAndUpdate({ ville: dest } , { $set :  {stock : responseDest.stock}  });


  res.status(200).json({
    message: "SUCCESS",
    
  });

};

exports.create = (req, res, next) => {
  const ville = req.body.ville;
  const stock = req.body.stock;

  const newStock = new Stock({
    ville: ville,
    stock: stock,
  });
  newStock
    .save()
    .then((stock) => {
      res.status(201).json({
        message: "SUCCESS",
        data: stock,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Stock.findById(id)
    .then((prod) => {
      if (prod) {
        return Stock.findByIdAndRemove(id);
      }
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted product." });
    })
    .catch((err) => {
      next(err);
    });
};
