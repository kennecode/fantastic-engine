import {Form, FormField, FieldValue, FieldAttributes} from "./app.interfaces";
import {useEffect} from "preact/compat";
import {useLocalStorage} from "./hooks/useLocalStorage";

export default function App(props:Form) {
    const [data, setData] = useLocalStorage('form', {});
    const {title, subtitle, action, method, form} = props;

    // let's check the form inputs as data changes
    useEffect(() => {
        form.forEach((p:FormField) => {
            // const field = document.getElementById(p.name);
            // const valid = field?.checkValidity();
            // console.log(p.name, field?.checkValidity());
            // if (field && !valid) {
            //     field.classList.add('error');
            //     field.classList.remove('valid');
            // } else if (field && valid) {
            //     field.classList.add('valid');
            //     field.classList.remove('error');
            // }
            // {p.values.map((o:FieldValue) => (
        })
    }, [form, data]);

    // save data as it changes
    const updateData = (e:any) => {
        setData({...data, ...{
            [e.target.name]: e.target.value
        }})
    }

    const formInput = (p:FormField) => {
        const value:any = data[p.name as keyof Object] || '';
        const attributes:FieldAttributes = p.attributes || {};
        switch(p.type) {
            case 'text':
            case 'tel':
            case 'email':
            case 'password':
                return (
                    <div>
                        <label for={p.name}>{p.label}</label>
                        <input id={p.name} name={p.name} type={p.type} onInput={updateData} value={value} {...attributes} />
                    </div>
                )
            case 'radio':
            case 'checkbox':
                return (
                    <div>
                        <label>{p.label}</label>
                        {p.values?.map((o:FieldValue) => (
                            <>
                                <input id={`${p.name}_${o.value}`} name={`${p.name}_${o.value}`} type={p.type} onClick={updateData} value={o.value} checked={o.value===value} {...attributes} />
                                <label for={`${p.name}_${o.value}`}>{o.display}</label>
                            </>
                        ))}
                    </div>
                )
            case 'textarea':
                return (
                    <div>
                        <label for={p.name}>{p.label}</label>
                        <textarea id={p.name} name={p.name} onInput={updateData} {...attributes}>{value}</textarea>
                    </div>
                )
            case 'select':
                return (
                    <div>
                        <label>{p.label}</label>
                        <select name={p.name} onChange={updateData} {...attributes}>
                            {p.values?.map((o:FieldValue) => (
                                <option value={o.value} selected={o.value===value}>
                                    {o.display}
                                </option>
                            ))}
                        </select>
                    </div>
                )
        }
    }

    const submit = (e:any) => {
        console.log({e, data});
        const formData = new FormData();
        Object.entries(data).forEach((p:any) => {
            formData.append(p[0],p[1]);
        })
        fetch(action, {
            "body": formData,
            "method": method,
        });
    }

    return (
        <div>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    {form.map(formInput)}
                </div>
                <div>
                    <button onClick={submit}>Submit</button>
                </div>
            </form>
        </div>
    );
}

