const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};
const fillFormFields = () => {
  try {
    if (localStorage.length === 0) {
      return;
    }

    const forDataFormLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    formData = forDataFormLS;

    for (const key in forDataFormLS) {
      feedbackFormEl.elements[key].value = forDataFormLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};

fillFormFields();

const onFormFieldChange = event => {
  const { target: formFieldEl } = event;
  const fildValue = formFieldEl.value;
  const fildName = formFieldEl.name;
  formData[fildName] = fildValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  if (formData.message.trim() === '' || formData.email === '') {
    event.preventDefault();
    return alert('Fill please all fields');
  }
  const { currentTarget: formEL } = event;
  formEL.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', onFormFieldChange);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
