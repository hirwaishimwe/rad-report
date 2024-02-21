export const validateUser = (req, res, next) => {
    const {
        medical_record_number,
        age,
        sex,
        pro_nouns,
        zip_code,
        latest_bmi,
        latest_weight,
        png_filename,
        exam_id,
        icu_admit,
        icu_admits_count,
        mortality,
    } = req.body;
    const errors = [];

    switch (true) {
        case !medical_record_number:
            errors.push("Please enter a valid patient identification");
            break;
        case !age:
            errors.push("Please enter a valid age");
            break;
        case !sex:
            errors.push("Please specify the sex");
            break;

        default:
            break;
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors: errors,
        });
    } else {
        next();
    }
};
