import React from 'react';

if (!('requestSubmit' in HTMLFormElement.prototype)) {
  HTMLFormElement.prototype.requestSubmit = function () {
    if (this.submit) {
      this.submit();
    }
  };
}

