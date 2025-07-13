/* eslint-disable node/no-unsupported-features/es-syntax */
class APIFeatures {
  constructor(Mongoosequery, queryString) {
    this.Mongoosequery = Mongoosequery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringob = { ...this.queryString };
    const excludeFields = ["page", "limit", "sort", "fields", "keyword"];
    excludeFields.forEach((el) => delete queryStringob[el]);
    let queryString = JSON.stringify(queryStringob);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    this.Mongoosequery = this.Mongoosequery.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.replace(",", " ");
      this.Mongoosequery = this.Mongoosequery.sort(sortby);
    } else {
      this.Mongoosequery = this.Mongoosequery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.Mongoosequery = this.Mongoosequery.select(fields);
    } else {
      this.Mongoosequery = this.Mongoosequery.select("-__v");
    }
    return this;
  }

  pagination(countDocument) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    // pagination result
    const pagination = {};

    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPage = Math.ceil(countDocument / limit);
    if (endIndex < countDocument) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.Mongoosequery = this.Mongoosequery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  serching(modelsName) {
    if (this.queryString.keyword) {
      if (modelsName === "Product") {
        this.Mongoosequery = this.Mongoosequery.find({
          $or: [
            { title: { $regex: this.queryString.keyword, $options: "i" } },
            {
              description: { $regex: this.queryString.keyword, $options: "i" },
            },
          ],
        });
      } else {
        this.Mongoosequery = this.Mongoosequery.find({
          name: { $regex: this.queryString.keyword, $options: "i" },
        });
      }
    }
    return this;
  }
}

module.exports = APIFeatures;
