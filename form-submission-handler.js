(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;
    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            if(item.type==='checkbox') {
              console.log("pushing data for checkbox")
              data.push(item.id)
            }
            else {
              data.push(item.value);
            }
          }
        }
        formData[name] = data.join(': ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {
    // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    console.log(formData)
    var data = formData.data;
    console.log(formData)
    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      console.log("Honeypot filled hence returning")
      return false;
    }
    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
        }
    };
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    console.log("Sent form data")
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
  console.log("created")
})();

function form2() {
  document.getElementById('form_inputs_1').style.display = 'None'
  document.getElementById('form_inputs_2').style.display = 'block'
  document.getElementById('submit').style.display = 'block'
  document.getElementsByName("Drug class").forEach(ele=>{
    ele.style.display='None'
    $('label[for="'+ele.id+'"]').hide ();
  })
  document.getElementsByName("Indications").forEach(ele=>{
    $('label[for="'+ele.id+'"]').hide ();
    ele.style.display='None'
  })
  document.getElementsByName("mechanism_of_action").forEach(ele=>{
    $('label[for="'+ele.id+'"]').hide ();
    ele.style.display='None'
  })
if (document.getElementById("Dermatology").checked) {
document.querySelectorAll(" #Cysts,#Hair\\ disorders,#Immunological\\ disorders,#Infections,#Nevi\\ and\\ melanomas,#Pigmentation,#Skin\\ and\\ soft\\ tissue\\ infections,#Skin\\ cancer,#Skin\\ disorders,#Vascular\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Cardiovascular").checked) {
document.querySelectorAll(" #Cardiovascular\\ disorders,#Heart\\ disorders,#Immunological\\ disorders,#Infections,#Vascular\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Oncology").checked) {
document.querySelectorAll(" #Benign\\ tumours,#Biliary\\ cancer,#Bone\\ cancer,#Breast\\ cancer,#CNS\\ cancer,#Cancer\\ metastases,#Colorectal\\ cancer,#Connective\\ and\\ soft\\ tissue\\ neoplasms,#Connective\\ tissue\\ neoplasms,#Drug\\ toxicity,#Eye\\ neoplasms,#Gastrointestinal\\ cancer,#Germ\\ cell\\ and\\ embryonal\\ neoplasms,#Glandular\\ and\\ epithelial\\ neoplasms,#Haematological\\ malignancies,#Head\\ and\\ neck\\ cancer,#Hereditary\\ neoplastic\\ syndromes,#Immunological\\ disorders,#Liver\\ cancer,#Lung\\ cancer,#Malignant\\ thymoma,#Mesothelioma,#Nerve\\ tissue\\ neoplasms,#Neuroendocrine\\ carcinoma,#Neuroendocrine\\ tumours,#Nevi\\ and\\ melanomas,#Pancreatic\\ cancer,#Pelvic\\ cancer,#Peripheral\\ nervous\\ system\\ neoplasms,#Peritoneal\\ cancer,#Plasmacytoma,#Precancerous\\ conditions,#Sarcoma,#Skin\\ cancer,#Solid\\ tumours,#Squamous\\ cell\\ cancer,#Thyroid\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Rare Diseases").checked) {
document.querySelectorAll(" #Congenital\\ disorders,#Germ\\ cell\\ and\\ embryonal\\ neoplasms,#Glandular\\ and\\ epithelial\\ neoplasms,#Hereditary\\ neoplastic\\ syndromes,#Immunological\\ disorders,#Inborn\\ genetic\\ disorders,#Infections,#Mental\\ disorders,#Metabolic\\ disorders,#Pigmentation").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychiatry").checked) {
document.querySelectorAll(" #Behaviour\\ and\\ behaviour\\ mechanisms,#Mental\\ disorders,#Nutrition\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychology").checked) {
document.querySelectorAll(" #Behaviour\\ and\\ behaviour\\ mechanisms,#Mental\\ disorders,#Nutrition\\ disorders,#Substance-related\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hepatology").checked) {
document.querySelectorAll(" #Biliary\\ cancer,#Infections,#Liver\\ cancer,#Liver\\ disorders,#Metabolic\\ disorders,#Pancreatic\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Endocrinology & Metabolic Diseases").checked) {
document.querySelectorAll(" #Diabetes\\ mellitus,#Diabetic\\ complications,#Endocrine\\ disorders,#Immunological\\ disorders,#Metabolic\\ disorders,#Thyroid\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("ENT").checked) {
document.querySelectorAll(" #Anaesthesia,#Benign\\ tumours,#Colorectal\\ cancer,#Digestive\\ system\\ disorders,#Drug\\ toxicity,#Ear\\ nose\\ and\\ throat\\ disorders,#Gastrointestinal\\ cancer,#Infections,#Mouth\\ disorders,#Peritoneal\\ cancer,#Sedation,#Thyroid\\ cancer,#Wounds\\ and\\ injuries").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Infectious Diseases").checked) {
document.querySelectorAll(" #Infections,#Respiratory\\ tract\\ infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Respiratory").checked) {
document.querySelectorAll(" #Infections,#Lung\\ cancer,#Mesothelioma,#Respiration\\ disorders,#Respiratory\\ hypersensitivity,#Respiratory\\ tract\\ disorders,#Respiratory\\ tract\\ infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Neurology").checked) {
document.querySelectorAll(" #CNS\\ cancer,#Infections,#Nerve\\ tissue\\ neoplasms,#Neuroendocrine\\ carcinoma,#Neuroendocrine\\ tumours,#Neurologic\\ manifestations,#Neurological\\ disorders,#Neuromuscular\\ blockade,#Neuromuscular\\ disorders,#Peripheral\\ nervous\\ system\\ neoplasms,#Sclerosis").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Urology").checked) {
document.querySelectorAll(" #CNS\\ cancer,#Infections,#Male\\ genital\\ diseases,#Male\\ urogenital\\ diseases,#Nerve\\ tissue\\ neoplasms,#Neuroendocrine\\ carcinoma,#Neuroendocrine\\ tumours,#Neurologic\\ manifestations,#Neurological\\ disorders,#Neuromuscular\\ blockade,#Neuromuscular\\ disorders,#Peripheral\\ nervous\\ system\\ neoplasms,#Sclerosis,#Urogenital\\ abnormalities,#Urogenital\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Men's Health").checked) {
document.querySelectorAll(" #Breast\\ cancer,#Pelvic\\ cancer,#Urogenital\\ abnormalities,#Urogenital\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Women's Health").checked) {
document.querySelectorAll(" #Breast\\ cancer,#Pelvic\\ cancer,#Urogenital\\ abnormalities").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gastoenterology").checked) {
document.querySelectorAll(" #Infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hematology").checked) {
document.querySelectorAll(" #Infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Soft & Connective Tissue").checked) {
document.querySelectorAll(" #Connective\\ and\\ soft\\ tissue\\ neoplasms,#Connective\\ tissue\\ disorders,#Connective\\ tissue\\ neoplasms,#Cysts,#Infections,#Lymphatic\\ disorders,#Mesothelioma,#Plasmacytoma,#Sarcoma,#Skin\\ and\\ soft\\ tissue\\ infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Opthalmology").checked) {
document.querySelectorAll(" #Infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Internal Medicine").checked) {
document.querySelectorAll(" #Infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Musculoskeletal").checked) {
document.querySelectorAll(" #Bone\\ cancer,#Connective\\ tissue\\ disorders,#Connective\\ tissue\\ neoplasms,#Infections,#Musculoskeletal\\ disorders,#Neuromuscular\\ blockade,#Neuromuscular\\ disorders,#Sarcoma,#Skin\\ and\\ soft\\ tissue\\ infections").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Surgery").checked) {
document.querySelectorAll(" #Anaesthesia,#Sedation,#Wounds\\ and\\ injuries").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Pain & Analgesia").checked) {
document.querySelectorAll(" #Anaesthesia,#Sedation").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Toxicology & Poisoning").checked) {
document.querySelectorAll(" #Drug\\ toxicity,#Substance-related\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Immunology").checked) {
document.querySelectorAll(" #Drug\\ toxicity,#Immunological\\ disorders,#Lymphatic\\ disorders,#Respiratory\\ hypersensitivity").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Accident & Emergency").checked) {
document.querySelectorAll(" #Anaesthesia,#Drug\\ toxicity,#Sedation,#Wounds\\ and\\ injuries").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gynaecology").checked) {
document.querySelectorAll(" #Genitourinary\\ disorders,#Urogenital\\ abnormalities,#Urogenital\\ cancer").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Nutrition & Weight Loss").checked) {
document.querySelectorAll(" #Nutrition\\ disorders").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Tissue & Regenerative Medicine").checked) {
document.querySelectorAll(" #Wounds\\ and\\ injuries").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Others").checked) {
document.querySelectorAll(" #Pathologic\\ processes,#Pathological\\ conditions|\\ anatomical,#Pathology\\ and\\ biological\\ functions,#Signs\\ and\\ symptoms,#Signs\\ symptoms\\ and\\ ill-defined\\ conditions").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Dermatology").checked) {
document.querySelectorAll(" #Antioxidants,#Chemical\\ modulators,#Scavengers,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Cardiovascular").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ factor\\ modulators,#Cell\\ modulators,#Cell\\ replacements,#Chemical\\ modulators,#Cholesterol\\ absorption\\ inhibitors,#Cholesterol\\ synthesis\\ inhibitors,#Diagnostic\\ imaging\\ enhancers,#Diuretics,#Hormone\\ modulators,#Hormone\\ replacements,#Inorganic\\ chemical\\ modulators,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Lipid\\ modulators,#Nitric\\ oxide\\ donors,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Receptor\\ inverse\\ agonists,#Scavengers,#Vascular\\ disrupting\\ agents,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Oncology").checked) {
document.querySelectorAll(" #Alkylating\\ agents,#Amino\\ acid\\ modulators,#Antimetabolites,#Biological\\ factor\\ modulators,#Carbohydrate\\ metabolism\\ modulators,#Cell\\ modulators,#Cell\\ physiology\\ modulators,#Chemical\\ modulators,#Cytokine\\ inhibitors,#Cytokine\\ modulators,#Cytokine\\ stimulants,#Enzyme\\ modulators,#Gene\\ transference,#Genetic\\ process\\ modulators,#Genetic\\ structure\\ modulators,#Glycopeptide\\ modulators,#Glycoprotein\\ modulators,#Immunologic\\ cytotoxicity,#Inorganic\\ chemical\\ modulators,#Ionising\\ radiation\\ emitters,#Macromolecular\\ substance\\ inhibitors,#Macromolecular\\ substance\\ stimulants,#Membrane\\ glycoprotein\\ modulators,#Metabolism-modulators,#Multiprotein\\ complex\\ modulators,#Nucleic\\ acid\\ nucleotide\\ and\\ nucleoside\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Photosensitisers,#Polymer\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Signal\\ transduction\\ pathway\\ modulators,#Tissue\\ replacements,#Vascular\\ disrupting\\ agents,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Rare Diseases").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ factor\\ modulators,#Blood\\ physiology\\ modulators,#Bone\\ development\\ modulators,#Carbohydrate\\ metabolism\\ modulators,#Cell\\ modulators,#Cell\\ physiology\\ modulators,#Cell\\ replacements,#Chemical\\ modulators,#Cholesterol\\ absorption\\ inhibitors,#Cholesterol\\ synthesis\\ inhibitors,#Cytokine\\ inhibitors,#Cytokine\\ modulators,#Enzyme\\ modulators,#Enzyme\\ replacements,#Gene\\ transference,#Genetic\\ process\\ modulators,#Genetic\\ structure\\ modulators,#Growth\\ substance\\ modulators,#Haemic\\ and\\ immune\\ system\\ modulators,#Hormone\\ replacements,#Inorganic\\ chemical\\ modulators,#Inorganic\\ chemical\\ replacements,#Lipid\\ modulators,#Macromolecular\\ substance\\ inhibitors,#Macromolecular\\ substance\\ stimulants,#Metabolism-modulators,#Multiprotein\\ complex\\ modulators,#Nucleic\\ acid\\ nucleotide\\ and\\ nucleoside\\ modulators,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polymer\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Signal\\ transduction\\ pathway\\ modulators,#Undefined\\ mechanism,#Vascular\\ disrupting\\ agents,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychiatry").checked) {
document.querySelectorAll(" #Central\\ nervous\\ system\\ modulators,#Chemical\\ modulators,#Enzyme\\ modulators,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Microbiome\\ modulators,#Nervous\\ system\\ modulators,#Neurotransmitter\\ agents,#Neurotransmitter\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Signal\\ transduction\\ pathway\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychology").checked) {
document.querySelectorAll(" ").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hepatology").checked) {
document.querySelectorAll(" #Peptide\\ modulators,#Peptide\\ replacements,#Polymer\\ modulators,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Signal\\ transduction\\ pathway\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Endocrinology & Metabolic Diseases").checked) {
document.querySelectorAll(" #Chemical\\ modulators,#Cholesterol\\ absorption\\ inhibitors,#Cholesterol\\ synthesis\\ inhibitors,#Enzyme\\ modulators,#Lipid\\ modulators,#Multiprotein\\ complex\\ modulators,#Polysaccharide\\ inhibitors,#Receptor\\ inverse\\ agonists").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("ENT").checked) {
document.querySelectorAll(" #Enzyme\\ modulators,#Hormone\\ modulators,#Immunologic\\ cytotoxicity,#Microbiome\\ modulators,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Platelet\\ aggregation\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Tissue\\ replacements,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Infectious Diseases").checked) {
document.querySelectorAll(" #Chemical\\ modulators,#Enzyme\\ modulators,#Nucleic\\ acid\\ nucleotide\\ and\\ nucleoside\\ modulators,#Polymer\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Steroid\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Respiratory").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ transport\\ modulators,#Chemical\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Steroid\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Neurology").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ factor\\ modulators,#Biological\\ transport\\ modulators,#Cell\\ modulators,#Cell\\ replacements,#Central\\ nervous\\ system\\ modulators,#Chemical\\ modulators,#Diagnostic\\ imaging\\ enhancers,#Enzyme\\ modulators,#Inorganic\\ chemical\\ modulators,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Nervous\\ system\\ modulators,#Neuromuscular\\ blocking\\ agents,#Neurotransmitter\\ agents,#Neurotransmitter\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polymer\\ modulators,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Receptor\\ inverse\\ agonists,#Scavengers,#Signal\\ transduction\\ pathway\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Urology").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ factor\\ modulators,#Biological\\ transport\\ modulators,#Cell\\ modulators,#Cell\\ replacements,#Central\\ nervous\\ system\\ modulators,#Chemical\\ modulators,#Diagnostic\\ imaging\\ enhancers,#Enzyme\\ modulators,#Inorganic\\ chemical\\ modulators,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Nervous\\ system\\ modulators,#Neuromuscular\\ blocking\\ agents,#Neurotransmitter\\ agents,#Neurotransmitter\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polymer\\ modulators,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Receptor\\ inverse\\ agonists,#Scavengers,#Signal\\ transduction\\ pathway\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Men's Health").checked) {
document.querySelectorAll(" #Antioxidants,#Hormone\\ modulators,#Hormone\\ replacements,#Ovarian\\ follicle\\ modulators,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Steroid\\ modulators,#Testosterone\\ replacements,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Women's Health").checked) {
document.querySelectorAll(" #Antioxidants,#Hormone\\ modulators,#Hormone\\ replacements,#Ovarian\\ follicle\\ modulators,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Steroid\\ modulators,#Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gastoenterology").checked) {
document.querySelectorAll(" #Virus\\ internalisation\\ modulators,#Virus\\ replication\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hematology").checked) {
document.querySelectorAll(" #Biological\\ factor\\ modulators,#Blood\\ physiology\\ modulators,#Cell\\ modulators,#Cell\\ physiology\\ modulators,#Cell\\ replacements,#Diuretics,#Enzyme\\ modulators,#Genetic\\ process\\ modulators,#Genetic\\ structure\\ modulators,#Haemic\\ and\\ immune\\ system\\ modulators,#Nitric\\ oxide\\ donors,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Platelet\\ aggregation\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Signal\\ transduction\\ pathway\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Soft & Connective Tissue").checked) {
document.querySelectorAll(" #Cell\\ modulators,#Cell\\ physiology\\ modulators,#Cell\\ replacements,#Chemical\\ modulators,#Enzyme\\ modulators,#Peptide\\ modulators,#Polymer\\ modulators,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Tissue\\ replacements").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Opthalmology").checked) {
document.querySelectorAll(" #Enzyme\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Internal Medicine").checked) {
document.querySelectorAll(" ").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Musculoskeletal").checked) {
document.querySelectorAll(" #Bone\\ development\\ modulators,#Neuromuscular\\ blocking\\ agents,#Neurotransmitter\\ modulators,#Polymer\\ modulators,#Protein\\ modulators,#Steroid\\ modulators,#Testosterone\\ replacements,#Tissue\\ replacements").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Surgery").checked) {
document.querySelectorAll(" #Blood\\ physiology\\ modulators,#Diagnostic\\ imaging\\ enhancers,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Platelet\\ aggregation\\ modulators,#Tissue\\ replacements").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Pain & Analgesia").checked) {
document.querySelectorAll(" #Biological\\ factor\\ modulators,#Biological\\ transport\\ modulators,#Ion\\ channel\\ agonists,#Ion\\ channel\\ antagonists,#Ion\\ channel\\ modulators,#Nervous\\ system\\ modulators,#Neuromuscular\\ blocking\\ agents,#Neurotransmitter\\ agents,#Neurotransmitter\\ modulators,#Peptide\\ modulators,#Polysaccharide\\ modulators,#Protein\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Toxicology & Poisoning").checked) {
document.querySelectorAll(" #Binding\\ agents,#Biological\\ factor\\ modulators,#Enzyme\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Immunology").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ factor\\ modulators,#Cell\\ modulators,#Cell\\ physiology\\ modulators,#Cell\\ replacements,#Chemical\\ modulators,#Cytokine\\ inhibitors,#Cytokine\\ modulators,#Cytokine\\ stimulants,#Enzyme\\ modulators,#Genetic\\ process\\ modulators,#Genetic\\ structure\\ modulators,#Glycopeptide\\ modulators,#Glycoprotein\\ modulators,#Haemic\\ and\\ immune\\ system\\ modulators,#Immunologic\\ cytotoxicity,#Inorganic\\ chemical\\ modulators,#Lipid\\ modulators,#Membrane\\ glycoprotein\\ modulators,#Multiprotein\\ complex\\ modulators,#Nitric\\ oxide\\ donors,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ inhibitors,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Signal\\ transduction\\ pathway\\ modulators,#Steroid\\ modulators,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Accident & Emergency").checked) {
document.querySelectorAll(" #Binding\\ agents,#Biological\\ factor\\ modulators,#Blood\\ physiology\\ modulators,#Cell\\ replacements,#Immunologic\\ cytotoxicity,#Platelet\\ aggregation\\ modulators,#Tissue\\ replacements").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gynaecology").checked) {
document.querySelectorAll(" #Ovarian\\ follicle\\ modulators,#Peptide\\ hormone\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Nutrition & Weight Loss").checked) {
document.querySelectorAll(" #Antioxidants,#Biological\\ transport\\ modulators,#Chemical\\ modulators,#Cholesterol\\ absorption\\ inhibitors,#Cholesterol\\ synthesis\\ inhibitors,#Enzyme\\ modulators,#Hormone\\ modulators,#Hormone\\ replacements,#Inorganic\\ chemical\\ modulators,#Inorganic\\ chemical\\ replacements,#Lipid\\ modulators,#Microbiome\\ modulators,#Peptide\\ hormone\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Scavengers,#Vitamin\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Tissue & Regenerative Medicine").checked) {
document.querySelectorAll(" #Biological\\ factor\\ modulators,#Cell\\ modulators,#Cell\\ physiology\\ modulators,#Cytokine\\ inhibitors,#Cytokine\\ modulators,#Cytokine\\ stimulants,#Genetic\\ process\\ modulators,#Genetic\\ structure\\ modulators,#Peptide\\ modulators,#Peptide\\ replacements,#Polysaccharide\\ modulators,#Protein\\ modulators,#Protein\\ replacements,#Signal\\ transduction\\ pathway\\ modulators").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Others").checked) {
document.querySelectorAll(" #Undefined\\ mechanism").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Dermatology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antihistamines,#Antipruritics,#Immunotherapies,#Phytotherapies,#Skin\\ disorder\\ therapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Cardiovascular").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Anticoagulants,#Cardiovascular\\ therapies,#Phytotherapies,#Sclerosants,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Oncology").checked) {
document.querySelectorAll(" #Adjuvants,#Antidiarrhoeals,#Antihormones,#Antineoplastics,#Chemopreventatives,#Chemoprotectants,#Chemosensitisers,#Immunotherapies,#Phytotherapies,#Radioprotectives,#Radiosensitisers,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Rare Diseases").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Calcium\\ supplements,#Digestion\\ aids,#Eye\\ disorder\\ therapies,#Foot\\ disorder\\ therapies,#Gastrokinetics,#Hormonal\\ replacements,#Immunotherapies,#Obesity\\ therapies,#Phytotherapies,#Sclerosants,#Skin\\ disorder\\ therapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychiatry").checked) {
document.querySelectorAll(" #Neuroprotectants,#Neuropsychotherapeutics,#Obesity\\ therapies,#Phytotherapies,#Probiotics,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Psychology").checked) {
document.querySelectorAll(" ").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hepatology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antifibrotics,#Choleretics,#Gallstone\\ therapies,#Hepatoprotectants,#Immunotherapies").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Endocrinology & Metabolic Diseases").checked) {
document.querySelectorAll(" #Immunotherapies,#Phytotherapies,#Probiotics,#Traditional\\ medicines,#Uricosurics").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("ENT").checked) {
document.querySelectorAll(" #Anaesthetics,#Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antiasthmatics,#Anticoagulants,#Antidiarrhoeals,#Antidotes,#Antihistamines,#Antihormones,#Antisecretories,#Antispasmodics,#Antitussives,#Antiulcers,#Bronchodilators,#Choleretics,#Coagulants,#Cytoprotectives,#Decongestants,#Digestion\\ aids,#Drug\\ withdrawal\\ therapies,#Expectorants,#Gastrokinetics,#Immunotherapies,#Irritable\\ bowel\\ syndrome\\ therapies,#Laxatives,#Mucolytics,#Muscle\\ relaxants,#Phytotherapies,#Probiotics,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Infectious Diseases").checked) {
document.querySelectorAll(" #Adjuvants,#Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antidiarrhoeals,#Antipyretics,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Respiratory").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antiasthmatics,#Antibronchitics,#Antifibrotics,#Antihistamines,#Antitussives,#Bronchodilators,#Decongestants,#Expectorants,#Immunotherapies,#Mucolytics,#Phytotherapies,#Surfactants,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Neurology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Immunotherapies,#Neuroprotectants,#Neuropsychotherapeutics,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Urology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Erectile\\ dysfunction\\ therapies,#Immunotherapies,#Infertility\\ therapies,#Neuroprotectants,#Neuropsychotherapeutics,#Phytotherapies,#Traditional\\ medicines,#Urologics,#Uroprotectives").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Men's Health").checked) {
document.querySelectorAll(" #Abortifacients,#Anabolic\\ steroids,#Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antihormones,#Calcium\\ supplements,#Erectile\\ dysfunction\\ therapies,#Hormonal\\ replacements,#Infertility\\ therapies,#Osteoporosis\\ therapies,#Oxytocics,#Phytotherapies,#Tocolytics,#Traditional\\ medicines,#Urologics,#Uroprotectives").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Women's Health").checked) {
document.querySelectorAll(" #Abortifacients,#Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antihormones,#Calcium\\ supplements,#Hormonal\\ replacements,#Infertility\\ therapies,#Osteoporosis\\ therapies,#Oxytocics,#Phytotherapies,#Tocolytics,#Traditional\\ medicines,#Urologics,#Uroprotectives").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gastoenterology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Hematology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Soft & Connective Tissue").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Antiallergics,#Antifibrotics,#Antiulcers,#Phytotherapies").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Opthalmology").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories,#Eye\\ disorder\\ therapies,#Phytotherapies").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Internal Medicine").checked) {
document.querySelectorAll(" #Anti-infectives,#Anti-inflammatories").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Musculoskeletal").checked) {
document.querySelectorAll(" #Anabolic\\ steroids,#Antihypercalcaemics,#Antirheumatics,#Antispasmodics,#Antispastics,#Calcium\\ supplements,#Foot\\ disorder\\ therapies,#Muscle\\ relaxants,#Osteoporosis\\ therapies,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Surgery").checked) {
document.querySelectorAll(" #Anaesthetics,#Anti-infectives,#Anti-inflammatories,#Anticoagulants,#Coagulants,#Muscle\\ relaxants").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Pain & Analgesia").checked) {
document.querySelectorAll(" #Anaesthetics,#Antihistamines,#Antispasmodics,#Antispastics,#Muscle\\ relaxants,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Toxicology & Poisoning").checked) {
document.querySelectorAll(" #Drug\\ withdrawal\\ therapies,#Hepatoprotectants,#Phytotherapies,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Immunology").checked) {
document.querySelectorAll(" #Adjuvants,#Antiasthmatics,#Antibronchitics,#Antihistamines,#Antipruritics,#Antipyretics,#Antirheumatics,#Immunotherapies,#Irritable\\ bowel\\ syndrome\\ therapies,#Phytotherapies,#Probiotics,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Accident & Emergency").checked) {
document.querySelectorAll(" #Anaesthetics,#Antiasthmatics,#Anticoagulants,#Antidotes,#Bronchodilators,#Coagulants,#Drug\\ withdrawal\\ therapies").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Gynaecology").checked) {
document.querySelectorAll(" #Abortifacients,#Infertility\\ therapies,#Oxytocics,#Tocolytics").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Nutrition & Weight Loss").checked) {
document.querySelectorAll(" #Anabolic\\ steroids,#Antihypercalcaemics,#Antihyperglycaemics,#Antihypoglycaemics,#Calcium\\ regulators,#Calcium\\ supplements,#Digestion\\ aids,#Hyperphosphataemia\\ therapies,#Insulin\\ sensitisers,#Obesity\\ therapies,#Phytotherapies,#Probiotics,#Traditional\\ medicines").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Tissue & Regenerative Medicine").checked) {
document.querySelectorAll(" ").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
if (document.getElementById("Others").checked) {
document.querySelectorAll(" ").forEach(ele=>{$('label[for="'+ele.id+'"]').show();})
}
    // $(window).scrollTop(100);
  $('html, body').animate({scrollTop:100}, 'slow');
    // var elmnt = document.getElementById("form_inputs_2").click();
    // elmnt.scrollIntoView();
  }
  function form1() {
    document.getElementById('form_inputs_1').style.display='block'
    document.getElementById('form_inputs_2').style.display='None'
    document.getElementById('submit').style.display='None'
    $('html, body').animate({scrollTop:100}, 'slow');
    // var elmnt = document.getElementById("form_inputs_2").click();
    // elmnt.scrollIntoView();
  }

