using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
namespace SoftLaw.Models
{
    public interface ICustomField
    {
        FieldDataType FieldDataType { get; set; }
    }

    public enum FieldDataType { text, number, binary, date, dropdown_list }
}