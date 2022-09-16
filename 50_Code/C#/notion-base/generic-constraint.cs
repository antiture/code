
using System;
using System.Collections.Generic;

public interface IDocument<C> where C : ICustomField
{
    Guid Id { get; set; }
}

public class Document : IDocument<CustomField>
{
    public string Other { get; set; }
}

public class CustomField: ICustomField
{
    public string Other { get; set; }
}

public interface ICustomField
{
    Guid Id { get; set; }
}
