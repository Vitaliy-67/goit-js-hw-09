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
  console.log(formData);
  const { currentTarget: formEL } = event;
  formEL.reset();
  formData.email = '';
  formData.message = '';
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
};

feedbackFormEl.addEventListener('input', onFormFieldChange);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
