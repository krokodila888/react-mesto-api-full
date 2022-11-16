const Card = require('../models/card');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const WrongCardError = require('../errors/WrongCardError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.CARD_POST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new WrongCardError('Эту карточку удалить нельзя. Это чужая карточка!');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ data: card }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.DELETE_LIKE_NO_ID);
      }
      Card.findByIdAndUpdate(req.params.cardId, {
        $addToSet: { likes: req.user._id },
      }, { new: true })
        .orFail(() => {
          throw new NotFoundError(ERROR_MESSAGE.PUT_LIKE_INV_DATA);
        })
        .then((newCard) => res.send({ data: newCard }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.PUT_LIKE_INV_DATA));
      }
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.DELETE_LIKE_NO_ID);
      }
      Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((newCard) => res.send({ data: newCard }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.PUT_LIKE_INV_DATA));
      }
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};
