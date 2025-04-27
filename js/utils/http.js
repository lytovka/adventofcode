class ApplicationResponse {
  constructor(body, headers) {
    this.body = body;
    this.headers = headers;
  }
}

class ApplicationError {
  constructor(body = null, headers = null) {
    this.body = body;
    this.headers = headers;
  }
}

class BadRequestError extends ApplicationError {
  constructor(body, headers) {
    super(body, headers);
  }
}

class NotFoundError extends ApplicationError {
  constructor(body, headers) {
    super(body, headers);
  }
}

class InternalServerError extends ApplicationError {
  constructor(body, headers) {
    super(body, headers);
  }
}

class Result {
  constructor(ok, payload, error) {
    this.ok = ok;
    this.payload = payload;
    this.error = error;
  }
}

class HttpHelper {
  async get(url, headers) {
    try {
      const response = await HttpHelper.#command("GET", url, null, headers);
      return new Result(true, response, null);
    } catch (error) {
      return HttpHelper.resultifyError(error);
    }
  }

  async post(url, body, headers) {
    try {
      const response = await HttpHelper.#command("POST", url, body, headers);
      return new Result(true, response, null);
    } catch (error) {
      return HttpHelper.resultifyError(error);
    }
  }

  static async #command(method, url, body = null, headers = {}) {
    return fetch(url, {
      body,
      method,
      headers,
    })
      .then(HttpHelper.#handleResponse)
      .catch(HttpHelper.#handleUnexpectedError);
  }

  static #handleResponse(response) {
    if (!response.ok) {
      return HttpHelper.#handleExpectedError(response);
    }
    return response.text().then(HttpHelper.#parseTextToJson);
  }

  static #parseTextToJson(text) {
    if (text) {
      try {
        return JSON.parse(text);
      } catch (error) {
        // console.error(
        //   `Error parsing text to JSON. Original text: ${text}`,
        //   error,
        // );
        return text;
      }
    }
    return null;
  }

  static #parseHeadersToObject(headers) {
    const headersJson = {};
    if (!headers || (!headers) instanceof Headers) {
      return headersJson;
    }
    headers.forEach((value, key) => {
      headersJson[key] = value;
    });
    return headersJson;
  }

  static async #handleExpectedError(errorResponse) {
    return errorResponse.text().then((text) => {
      const errorBody = HttpHelper.#parseTextToJson(text);
      const errorResponseHeaders = HttpHelper.#parseHeadersToObject(
        errorResponse.headers,
      );
      switch (errorResponse.status) {
        case 400:
          return Promise.reject(
            new BadRequestError(errorBody, errorResponseHeaders),
          );
        case 404:
          return Promise.reject(
            new NotFoundError(errorBody, errorResponseHeaders),
          );
        case 500:
          return Promise.reject(
            new InternalServerError(errorBody, errorResponseHeaders),
          );
        default:
          return Promise.reject(
            new ApplicationError(errorBody, errorResponseHeaders),
          );
      }
    });
  }

  static #handleUnexpectedError(error) {
    if (error instanceof ApplicationError) {
      return Promise.reject(error);
    }
    return Promise.reject(
      new ApplicationError(
        error.message,
        error.response ? error.response.headers : null,
      ),
    );
  }

  static resultifyError(error) {
    if (error instanceof ApplicationError) {
      return new Result(false, null, error);
    }
    return new Result(false, null, new ApplicationError(error.message));
  }
}

export default HttpHelper;
